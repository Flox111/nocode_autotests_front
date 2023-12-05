import {
  RequestParams,
  ResultProps,
  sendRequest,
} from "@/app/utils/HttpClient";
import { Edge, Node, getConnectedEdges } from "reactflow";
import {
  ConditionConfig,
  ExtractParamsConfig,
  MakeRequestConfig,
  PauseConfig,
} from "../nodes/nodes.config.";
import { conditions } from "../../dialog/ConditionalRuleDialog";
import { Log } from "../../dialog/LogDialog";
import * as _ from "lodash";
import { isEmpty } from "../options/flow.option";

export const runFlow = (
  nodes: Node[] | undefined,
  edges: Edge[] | undefined,
  setNodes: any,
  setLogs: any
) => {
  resetFlow(nodes, setNodes);
  const startNode = nodes?.find((it) => it.type == "startNode");
  const params = new Map<string, any>();
  let savedResponse: any = null;
  setLogs([]);
  const logs: Log[] = [];

  if (!isValid(nodes, setNodes, logs)) {
    setLogs(logs);
    return;
  }

  const recursiveFlow = async (currentNode: Node | undefined) => {
    if (currentNode != null && nodes != null) {
      let isTestSuccess = true;
      let isConditionFulfilled = true;
      logs.push(getLog(`Выполнение блока «${currentNode.data.description}»`));
      try {
        switch (currentNode.type) {
          case "httpRequest":
          case "getRequest":
          case "postRequest":
          case "deleteRequest":
          case "putRequest":
            savedResponse = await httpRequestHandle(currentNode, params, logs);
            if (savedResponse.state == "error") {
              isTestSuccess = false;
            }
            break;
          case "conditionalRule":
            if (!conditionRuleNodeHandle(currentNode, params, logs)) {
              isConditionFulfilled = false;
            }
            break;
          case "startNode":
            break;
          case "finishSuccessNode":
            break;
          case "finishErrorNode":
            break;
          case "pauseNode":
            await pauseNodeHandle(currentNode, logs);
            break;
          case "extractParamsNode":
            extractParamHandle(currentNode, params, logs, savedResponse);
            break;
          case "clearParamsNode":
            clearParamsHandle(params, logs);
            break;
          default:
            break;
        }
      } catch (e) {
        isTestSuccess = false;
        logs.push(
          getLog(
            `Во время выполнения произошла ошибка: ${(e as Error).message}`
          )
        );
      }
      setNodes((nds: Node[]) =>
        nds.map((node) => {
          if (node.id === currentNode.id) {
            node.data = {
              ...node.data,
              state: isTestSuccess ? "success" : "error",
            };
          }
          return node;
        })
      );

      if (!isTestSuccess) {
        return;
      }

      const outgoingEdges = getConnectedEdges(
        [currentNode],
        edges || []
      ).filter((edge: Edge) => {
        if (currentNode.type == "conditionalRule") {
          return isConditionFulfilled
            ? edge.source == currentNode.id && edge.sourceHandle == "true"
            : edge.source == currentNode.id && edge.sourceHandle == "false";
        } else {
          return edge.source == currentNode.id;
        }
      });

      if (outgoingEdges.length > 0) {
        const nextNode = nodes.find((node: Node) => {
          return node.id == outgoingEdges[0].target;
        });
        recursiveFlow(nextNode);
      }
    }
  };

  recursiveFlow(startNode);
  setLogs(logs);
};

export const isValid = (
  nodes: Node[] | undefined,
  setNodes: any,
  logs: Log[]
) => {
  let hasNoValidNode = false;
  if (nodes != undefined) {
    for (let currentNode of nodes) {
      let isValidNode = true;
      switch (currentNode.type) {
        case "httpRequest":
        case "getRequest":
        case "postRequest":
        case "deleteRequest":
        case "putRequest":
          const makeRequestConfig = currentNode.data
            .config as MakeRequestConfig;
          isValidNode = makeRequestConfig != null && makeRequestConfig.isValid;
          break;
        case "conditionalRule":
          const conditionConfig = currentNode.data.config as ConditionConfig;
          isValidNode = conditionConfig != null && conditionConfig.isValid;
          break;
        case "pauseNode":
          const pauseConfig = currentNode.data.config as PauseConfig;
          isValidNode = pauseConfig != null && pauseConfig.isValid;
          break;
        case "extractParamsNode":
          const extractParamsConfig = currentNode.data
            .config as ExtractParamsConfig;
          isValidNode =
            extractParamsConfig != null && extractParamsConfig.isValid;
          break;
        default:
          break;
      }
      if (!isValidNode) {
        hasNoValidNode = true;
        setNodes((nds: Node[]) =>
          nds.map((node) => {
            if (node.id === currentNode.id) {
              node.data = {
                ...node.data,
                state: "noValid",
              };
            }
            return node;
          })
        );
      }
    }
  } else {
    return false;
  }
  return !hasNoValidNode;
};
const getLog = (message: string) => {
  return {
    time: getTime(),
    message: message,
  };
};

const getTime = () => {
  const date = new Date();
  return date.toLocaleTimeString();
};

export const resetFlow = (nodes: Node[] | undefined, setNodes: any) => {
  setNodes((nds: Node[]) =>
    nds.map((node) => {
      node.data = {
        ...node.data,
        state: "none",
      };
      return node;
    })
  );
};

const httpRequestHandle = async (
  node: Node,
  params: Map<string, any>,
  logs: Log[]
) => {
  const makeRequestConfig = node.data.config as MakeRequestConfig;
  const request: RequestParams = {
    method: makeRequestConfig.method,
    url: replacePlaceholderInString(makeRequestConfig.url, params),
    headers: replacePlaceholderInMap(makeRequestConfig.headers, params),
    body: isEmpty(makeRequestConfig.body)
      ? null
      : JSON.stringify(
          JSON.parse(replacePlaceholderInString(makeRequestConfig.body, params))
        ),
  };

  let messageLog = "Отправка запроса с параметрами:";
  messageLog += `\nmethod: ${request.method}`;
  messageLog += `\nurl: ${request.url}`;
  messageLog += `\nheaders: ${JSON.stringify(
    Array.from(request.headers.entries())
  )}`;
  messageLog += `\nbody: ${request.body}`;
  logs.push(getLog(messageLog));

  const response = await sendRequest(request);
  params.set("response.status", response.status.toString());
  if (response.state == "error") {
    messageLog = "Ошибка во время выполнения запроса:";
  } else {
    messageLog = "Запрос успешно выполнен:";
  }
  messageLog += `\n${JSON.stringify(response, null, 2)}`;
  logs.push(getLog(messageLog));
  return response;
};

const pauseNodeHandle = async (node: Node, logs: Log[]) => {
  const pauseConfig = node.data.config as PauseConfig;
  const delay = Number(pauseConfig.value);
  logs.push(getLog(`Поставлена пауза на ${pauseConfig.value} мс`));
  await new Promise((f) => setTimeout(f, Number(pauseConfig.value)));
  logs.push(getLog("Пауза снята"));
};

const clearParamsHandle = (params: Map<string, string>, logs: Log[]) => {
  params.clear;
  logs.push(getLog("Переменные очищены"));
};

const extractParamHandle = (
  node: Node,
  params: Map<string, any>,
  logs: Log[],
  savedResponse: any
) => {
  const extractParamsConfig = node.data.config as ExtractParamsConfig;
  {
    Array.from(extractParamsConfig.params.entries()).map(([key, path]) => {
      const value = _.get(savedResponse, path);
      params.set(key, value);
      logs.push(getLog(`Создана переменная ${key} со значением ${value}`));
    });
  }
};

const conditionRuleNodeHandle = (
  node: Node,
  params: Map<string, string>,
  logs: Log[]
) => {
  const config = node.data.config as ConditionConfig;
  for (let predicate of config.allConditionsTrue) {
    logs.push(
      getLog(
        `Проверка, что значение переменной ${predicate.param} ${predicate.condition} ${predicate.expectedValue}`
      )
    );
    const condition = conditions.find((it) => it.name == predicate.condition);
    if (predicate.param == undefined || !params.has(predicate.param)) {
      logs.push(
        getLog(
          `Запрашиваемой переменной ${predicate.param} нет в списке доступных`
        )
      );
      return false;
    }
    const actualValue = params.get(predicate.param);
    if (
      condition == undefined ||
      condition.f == undefined ||
      actualValue == undefined ||
      !condition?.f(actualValue, predicate.expectedValue)
    ) {
      logs.push(getLog("Условие не выполнилось"));
      return false;
    }
    logs.push(getLog("Условие выполнилось"));
  }
  return true;
};

const replacePlaceholderInString = (
  data: string,
  params: Map<string, string>
): string => {
  let newData = data
  params.forEach((value, key) => {
    newData = newData.replaceAll("${" + key + "}", value);
  });
  return newData;
};

const replacePlaceholderInMap = (
  data: Map<string, string>,
  params: Map<string, string>
): Map<string, string> => {
  const replacedData: Map<string, string> = new Map();
  data.forEach((value, key) => {
    let tempValue = replacePlaceholderInString(value, params);
    replacedData.set(key, tempValue);
  });
  console.log(replacedData)
  return replacedData;
};

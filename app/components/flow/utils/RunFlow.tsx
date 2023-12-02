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

export const runFlow = (
  nodes: Node[] | undefined,
  edges: Edge[] | undefined,
  setNodes: any,
  setLogs: any
) => {
  resetFlow(nodes, setNodes);
  const startNode = nodes?.find((it) => it.type == "startNode");
  const params = new Map<string, string>();

  setLogs([]);
  const logs: Log[] = [];

  const recursiveFlow = async (currentNode: Node | undefined) => {
    if (currentNode != null && nodes != null) {
      let nodeStatus = "success";
      logs.push(getLog(`Выполнение блока «${currentNode.data.description}»`));
      switch (currentNode.type) {
        case "httpRequest":
        case "getRequest":
        case "postRequest":
        case "deleteRequest":
        case "putRequest":
          const makeRequestConfig = currentNode.data
            .config as MakeRequestConfig;
          const request: RequestParams = {
            method: makeRequestConfig.method,
            url: makeRequestConfig.url,
            headers: makeRequestConfig.headers,
            body: makeRequestConfig.body,
          };

          let messageLog = "Отправка запроса с параметрами:";
          messageLog += `\nmethod: ${makeRequestConfig.method}`;
          messageLog += `\nurl: ${makeRequestConfig.url}`;
          messageLog += `\nheaders: ${JSON.stringify(
            Array.from(makeRequestConfig.headers.entries())
          )}`;
          messageLog += `\nbody: ${makeRequestConfig.body}`;
          logs.push(getLog(messageLog));

          const response = await sendRequest(request);
          params.set("response.status", response.status.toString());
          params.set("response.body", response.body);
          if (response.state == "error") {
            nodeStatus = "error";
            messageLog = "Ошибка во время выполнения запроса:"
          } else {
            messageLog = "Запрос успешно выполнен:"
          }
          messageLog += `\nresponse.status: ${response.status.toString()}`;
          messageLog += `\nresponse.body: ${response.body}`;
          logs.push(getLog(messageLog));
          break;
        case "conditionalRule":
          conditionRuleNodeHandle(currentNode, params, logs);
          break;
        case "startNode":
          break;
        case "finishSuccessNode":
          break;
        case "finishErrorNode":
          break;
        case "pauseNode":
          const pauseConfig = currentNode.data.config as PauseConfig;
          const delay = Number(pauseConfig.value);
          if (isNaN(delay)) {
            nodeStatus = "error";
            logs.push(getLog(`Ошибка при парсинге значения ${pauseConfig.value}`));
          } else {
            logs.push(getLog(`Поставлена пауза на ${pauseConfig.value} мс`));
            await new Promise((f) => setTimeout(f, Number(pauseConfig.value)));
            logs.push(getLog("Пауза снята"))
          }
          break;
        case "extractParamsNode":
          const extractParamsConfig = currentNode.data
            .config as ExtractParamsConfig;
          extractParamsConfig.params;
          {
            Array.from(extractParamsConfig.params.entries()).map(
              ([key, value]) => {
                params.set(key, value);
                logs.push(
                  getLog(`Создана переменная ${key} со значением ${value}`)
                );
              }
            );
          }
          break;
        case "clearParamsNode":
          params.clear;
          logs.push(getLog("Переменные очищены"));
          break;
        default:
          break;
      }
      setNodes((nds: Node[]) =>
        nds.map((node) => {
          if (node.id === currentNode.id) {
            node.data = {
              ...node.data,
              state: nodeStatus,
            };
          }
          return node;
        })
      );

      if (nodeStatus == "error") {
        return;
      }

      const outgoingEdges = getConnectedEdges(
        [currentNode],
        edges || []
      ).filter((edge: Edge) => {
        return edge.source == currentNode.id;
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

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

export const runFlow = (
  nodes: Node[] | undefined,
  edges: Edge[] | undefined,
  setNodes: any
) => {
  resetFlow(nodes, setNodes);
  const startNode = nodes?.find((it) => it.type == "startNode");
  const params = new Map<string, string>();

  const recursiveFlow = async (currentNode: Node | undefined) => {
    if (currentNode != null && nodes != null) {
      let nodeStatus = "success";
      console.log(currentNode);
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
          const response = await sendRequest(request);
          params.set("response.status", response.status.toString());
          params.set("response.body", response.body);
          if (response.state == "error") {
            nodeStatus = "error";
          }
          break;
        case "conditionalRule":
          console.log(conditionRuleNodeHandle(currentNode, params));
          break;
        case "startNode":
          break;
        case "finishSuccessNode":
          console.log("Сценарий успешно завершен");
          break;
        case "finishErrorNode":
          console.log("Сценарий не выполнен");
          break;
        case "pauseNode":
          const pauseConfig = currentNode.data.config as PauseConfig;
          const delay = Number(pauseConfig.value);
          if (isNaN(delay)) {
            nodeStatus = "error";
          } else {
            await new Promise((f) => setTimeout(f, Number(pauseConfig.value)));
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
                console.log(`Создана переменная ${key} со значением ${value}`);
              }
            );
          }
          break;
        case "clearParamsNode":
          params.clear;
          console.log("Переменные очищены");
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

const conditionRuleNodeHandle = (node: Node, params: Map<string, string>) => {
  const config = node.data.config as ConditionConfig;
  for (let predicate of config.allConditionsTrue) {
    console.log(
      `Проверка, что значение переменной ${predicate.param} ${predicate.condition} ${predicate.expectedValue}`
    );
    const condition = conditions.find((it) => it.name == predicate.condition);
    if (predicate.param == undefined || !params.has(predicate.param)) {
      console.log(
        `Запрашиваемой переменной ${predicate.param} нет в списке доступных`
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
      console.log("Условие не выполнилось");
      return false;
    }
    console.log("Условие выполнилось");
  }
  return true;
};

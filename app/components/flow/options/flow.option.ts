import { MarkerType } from "reactflow";
import { Node } from "reactflow";

export const defaultEdgeOptions = {
  style: { strokeWidth: 1.5, stroke: "white" },
  type: "custom",
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "white",
  },
};

export const addNewNode = (
  type: string,
  description: string,
  icon: string,
  color: string,
  nodes: Node[] | undefined,
  setNodes: any,
  nodeCount: any,
  setNodeCount: any
) => {
  if (
    type == "startTriggerNode" &&
    nodes?.find((node: Node) => {
      return node.type == "startTriggerNode";
    })
  ) {
    return;
  }
  const newNode = {
    id: nodeCount.toString(),
    type: type,
    data: {
      title: `Block ${nodeCount + 1}`,
      description: description,
      icon: icon,
      color: color,
      state: "none",
      config: null,
      type: type
    },
    position: { x: 0, y: 0 },
  };
  setNodeCount(nodeCount + 1);
  setNodes((nds: any[]) => nds.concat(newNode));
};

export const getImageForState = (state?: string) => {
  switch (state) {
    case "success":
      return "check.svg";
    case "fail":
      return "error2.svg";
    case "process":
      return "waiting.svg";
    default:
      return null;
  }
};

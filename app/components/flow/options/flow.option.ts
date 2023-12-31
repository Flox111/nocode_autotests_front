import { Edge, MarkerType } from "reactflow";
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
      type: type,
    },
    position: { x: 0, y: 0 },
  };
  setNodeCount(nodeCount + 1);
  setNodes((nds: any[]) => nds.concat(newNode));
};

export const deleteNode = (
  id: string,
  nodes: Node[] | undefined,
  setNodes: any,
  edges: Edge[] | undefined,
  setEdges: any
) => {
  if (nodes) {
    const newNodesState = nodes.filter(it => {
      return it.id != id;
    });
    setNodes(newNodesState);
  }
  if (edges) {
    const newEdgesState = edges.filter(it => {
      return it.source != id && it.target != id;
    });
    setEdges(newEdgesState);
  }
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

export const getShadowCssPropertyForNode = (state?: string) => {
  switch (state) {
    case "success":
      return "rgb(99, 212, 137) 0px 0px 0px 2px, rgba(99, 212, 137, 0.12) 0px 0px 0px 8px";
    case "error":
      return "rgb(206, 76, 92) 0px 0px 0px 2px, rgba(206, 76, 92, 0.12) 0px 0px 0px 8px";
    case "noValid":
      return "rgb(243, 200, 49) 0px 0px 0px 2px, rgba(243, 200, 49, 0.12) 0px 0px 0px 8px";
    default:
      return "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.1) 0px 8px 10px -6px";
  }
};

export const isEmpty = (str: string) => {
  return str == null || str == "";
};

export function hashCode(str: string): number {
  var h: number = 0;
  for (var i = 0; i < str.length; i++) {
    h = 31 * h + str.charCodeAt(i);
  }
  return h & 0xffffffff;
}

import { createContext } from "react";
import { Edge, Node } from "reactflow";

export interface INodeContext {
  nodes?: Node[];
  setNodes?: any;
  onNodesChange?: any;
  edges?: Edge[];
  setEdges?: any
  onEdgesChange?: any;
  nodeCount?: any;
  setNodeCount?: any;
}

export const NodeContext = createContext<INodeContext>({});

import { createContext } from "react";
import { Edge } from "reactflow";

export interface INodeContext {
  nodes?: any;
  setNodes?: any;
  onNodesChange?: any;
  edges?: any;
  setEdges?: any
  onEdgesChange?: any;
  nodeCount?: any;
  setNodeCount?: any;
}

export const NodeContext = createContext<INodeContext>({});

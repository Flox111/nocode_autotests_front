import { EdgeTypes } from "reactflow";
import CustomEdge from "./edges/CustomEdge";
import ConditionalRuleNode from "./nodes/ConditionalRuleNode";
import CustomNode from "./nodes/MakeRequestNode";
import FinishTriggerNode from "./nodes/FinishTriggerNode";
import StartTriggerNode from "./nodes/StartTriggerNode";

export interface CustomNodeProps {
    title: string,
    description: string,
    icon: string,
    color?: string,
    state?: "success" | "fail" | "process" | "none" | undefined
}

export const nodeTypes = {
    customNode: CustomNode,
    conditionalRule: ConditionalRuleNode,
    startTriggerNode: StartTriggerNode,
    finishTriggerNode: FinishTriggerNode
};

export const edgeTypes: EdgeTypes = {
    custom: CustomEdge,
};

export interface CustomDialogProps {
    isOpen: boolean;
    closeModal: () => void;
    children?: React.ReactNode;
  }
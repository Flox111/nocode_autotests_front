import { EdgeTypes } from "reactflow";
import CustomEdge from "./edges/CustomEdge";
import ConditionalRuleNode from "./nodes/ConditionalRuleNode";
import FinishTriggerNode from "./nodes/FinishTriggerNode";
import StartTriggerNode from "./nodes/StartTriggerNode";
import { MakeRequestConfig } from "./nodes/nodes.config.";
import MakeRequestNode from "./nodes/MakeRequestNode";

export interface CustomNodeProps {
    title: string,
    description: string,
    icon: string,
    color?: string,
    state?: "success" | "fail" | "process" | "none" | undefined,
    config?: MakeRequestConfig,
    type?: string
}

export const nodeTypes = {
    getRequest: MakeRequestNode,
    postRequest: MakeRequestNode,
    deleteRequest: MakeRequestNode,
    putRequest: MakeRequestNode,
    httpRequest: MakeRequestNode,
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
    id: string;
    nodeProps?: CustomNodeProps;
  }
import { EdgeTypes } from "reactflow";
import CustomEdge from "./edges/CustomEdge";
import ConditionalRuleNode from "./nodes/ConditionalRuleNode";
import FinishTriggerNode from "./nodes/FinishTriggerNode";
import StartTriggerNode from "./nodes/StartTriggerNode";
import { ConditionConfig, MakeRequestConfig, PauseConfig } from "./nodes/nodes.config.";
import MakeRequestNode from "./nodes/MakeRequestNode";
import PauseNode from "./nodes/PauseNode";

export interface CustomNodeProps {
    title: string,
    description: string,
    icon: string,
    color?: string,
    state?: "success" | "fail" | "process" | "none" | undefined,
    config?: MakeRequestConfig | ConditionConfig | PauseConfig,
    type?: string
}

export const nodeTypes = {
    getRequest: MakeRequestNode,
    postRequest: MakeRequestNode,
    deleteRequest: MakeRequestNode,
    putRequest: MakeRequestNode,
    httpRequest: MakeRequestNode,
    conditionalRule: ConditionalRuleNode,
    startNode: StartTriggerNode,
    finishSuccessNode: FinishTriggerNode,
    finishErrorNode: FinishTriggerNode,
    pauseNode: PauseNode
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
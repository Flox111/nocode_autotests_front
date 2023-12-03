import { EdgeTypes } from "reactflow";
import CustomEdge from "./edges/CustomEdge";
import ConditionalRuleNode from "./nodes/ConditionalRuleNode";
import FinishTriggerNode from "./nodes/FinishTriggerNode";
import StartTriggerNode from "./nodes/StartTriggerNode";
import { ConditionConfig, ExtractParamsConfig, MakeRequestConfig, PauseConfig } from "./nodes/nodes.config.";
import MakeRequestNode from "./nodes/MakeRequestNode";
import PauseNode from "./nodes/PauseNode";
import ExtractParamsNode from "./nodes/ExtractParamsNode";
import ClearParamsNode from "./nodes/ClearParamsNode";
import { Log } from "../dialog/LogDialog";

export interface CustomNodeProps {
    title: string,
    description: string,
    icon: string,
    color?: string,
    state?: "success" | "fail" | "process" | "none" | undefined,
    config?: MakeRequestConfig | ConditionConfig | PauseConfig | ExtractParamsConfig,
    type?: string,
    
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
    pauseNode: PauseNode,
    extractParamsNode: ExtractParamsNode,
    clearParamsNode: ClearParamsNode
};

export const edgeTypes: EdgeTypes = {
    custom: CustomEdge,
};

export interface CustomDialogProps {
    isOpen: boolean;
    closeModal: () => void;
    children?: React.ReactNode;
    id?: string;
    nodeProps?: CustomNodeProps;
}

export interface LogDialogProps {
    isOpen: boolean;
    closeModal: () => void;
    logs: Log[]
}
import { EdgeTypes } from "reactflow";
import CustomEdge from "./edges/CustomEdge";
import ConditionalRuleNode from "./nodes/ConditionalRuleNode";
import CustomNode from "./nodes/CustomNode";
import FinishTriggerNode from "./nodes/FinishTriggerNode";
import StartTriggerNode from "./nodes/StartTriggerNode";

export interface CustomNodeProps {
    title: string,
    description: string,
    icon: string,
    color?: string,
    state?: "success" | "fail" | "process" | "none"
};

export const nodeTypes = {
    customNode: CustomNode,
    conditionalRule: ConditionalRuleNode,
    startTriggerNode: StartTriggerNode,
    finishTriggerNode: FinishTriggerNode
};

export const edgeTypes: EdgeTypes = {
    custom: CustomEdge,
};
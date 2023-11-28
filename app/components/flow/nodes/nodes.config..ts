export interface MakeRequestConfig {
    method: string;
    url: string;
    headers: Map<string, string>;
    body: any;
}

export interface ConditionConfig {
    allConditionsTrue: Condition[],
    oneOfConditionsTrue: Condition[]
}

export type Condition = {
    param: string,
    expectedValue: string,
    condition: string,
}

export interface PauseConfig {
    value: string,
}

export interface ExtractParamsConfig {
    params: Map<string, string>,
}
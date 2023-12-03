export interface MakeRequestConfig {
    method: string;
    url: string;
    headers: Map<string, string>;
    body: any;
    isValid: boolean
}

export interface ConditionConfig {
    allConditionsTrue: Condition[],
    oneOfConditionsTrue: Condition[],
    isValid: boolean
}

export type Condition = {
    param: string,
    expectedValue: string,
    condition: string
}

export interface PauseConfig {
    value: string,
    isValid: boolean
}

export interface ExtractParamsConfig {
    params: Map<string, string>,
    isValid: boolean
}
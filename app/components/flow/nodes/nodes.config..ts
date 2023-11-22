export interface MakeRequestConfig {
    method: string;
    url: string;
    headers: Map<string, string>;
    body: any;
}

export interface ConditionConfig {
    param: string,
    value: string,
    condition: string,
}

export interface PauseConfig {
    value: string,
}

export interface ExtractParamsConfig {
    params: Map<string, string>,
}
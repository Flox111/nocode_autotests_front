export interface MakeRequestConfig {
    method: string;
    url: string;
    headers: Map<string, string>;
    data: any;
}

export interface ConditionConfig {
    param: string,
    value: string,
    condition: string,
}
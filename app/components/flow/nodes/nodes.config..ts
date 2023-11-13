export interface MakeRequestConfig {
    method: string;
    url: string;
    headers: Map<string, string>;
    data: any;
}
import axios, { AxiosError, AxiosResponse } from "axios";

export type Header = {
  key: string;
  value: string;
};

export type RequestParams = {
  method: string;
  url: string;
  headers: Map<string, string>;
  body: any;
};

export type ResultProps = {
  state: string;
  status: number;
  body: any;
};

export const sendRequest = async ({
  method,
  url,
  headers,
  body,
}: RequestParams): Promise<ResultProps> => {
  const result: ResultProps = {
    state: "",
    status: 200,
    body: null,
  };

  const response = await axios({
    method: "POST",
    url: "http://localhost:8080/testRequestNode",
    data: {
      url: url,
      method: method,
      body: body,
      headers: Object.fromEntries(headers),
    },
  })
    .then((response: AxiosResponse) => {
      result.status = response.data.code;
      result.body = JSON.parse(response.data.body);
      return response;
    })
    .catch((reason: AxiosError) => {
      result.status = reason.status || 400;
      result.body = reason.message;
      return reason;
    });
  result.state = result.status == 200 ? "success" : "error";
  console.log(result)
  return result;
};

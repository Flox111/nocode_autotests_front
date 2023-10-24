import axios, { AxiosError, AxiosHeaders, AxiosResponse } from "axios";

export type Header = {
  key: string;
  value: string;
};

export type RequestParams = {
  method: string;
  url: string;
  headers: Header[];
  data: any;
};

export type ResultProps = {
  state: string,
  status: number,
  body: string
}

export const sendRequest = async ({
  method,
  url,
  headers,
  data,
}: RequestParams): Promise<ResultProps> => {

  const h: Map<string, string> = new Map()
  headers.map((header) => (h.set(header.key, header.value)));
  const result: ResultProps = {
    state: "",
    status: 200,
    body: ""
  }

  const response = await axios({
    method: "POST",
    url: "http://localhost:8080/testRequestNode",
    data: {
        "url": url,
        "method": method,
        "body": data,
        "headers": Object.fromEntries(h)
    }
  })
    .then((response: AxiosResponse) => {
      result.status = response.data.code
      result.body = JSON.stringify(response.data.body)
      return response
    })
    .catch((reason: AxiosError) => {
      
      result.status = reason.status || 400
      result.body = JSON.stringify(reason.message)
      return reason
    });
  result.state = result.status == 200 ? "success" : "error"
  console.log(result)
  return result;
};

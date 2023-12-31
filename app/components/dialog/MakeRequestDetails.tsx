"use client";

import React, { FC, useContext, useRef, useState } from "react";
import Image from "next/image";
import CustomDialog from "./CustomDialog";
import { CustomDialogProps } from "../flow/flow.types";
import { Tab } from "@headlessui/react";
import CustomListBox, { ListParameter } from "../listbox/CustomListBox";
import {
  RequestParams,
  ResultProps,
  sendRequest,
} from "@/app/utils/HttpClient";
import { TailSpin } from "react-loading-icons";
import { NodeContext } from "../context";
import { Node } from "reactflow";
import { MakeRequestConfig } from "../flow/nodes/nodes.config.";
import { isEmpty } from "../flow/options/flow.option";

const methods: ListParameter[] = [
  { id: 1, name: "GET" },
  { id: 2, name: "POST" },
  { id: 3, name: "DELETE" },
  { id: 4, name: "PUT" },
];

const getMethod = (config: MakeRequestConfig) => {
  return (
    methods.find((it) => {
      return it.name == config?.method;
    }) || methods[0]
  );
};

const MakeRequestDetails: FC<CustomDialogProps> = ({
  isOpen,
  closeModal,
  id,
  nodeProps,
}: CustomDialogProps) => {
  const { setNodes, nodes } = useContext(NodeContext);
  const currentNode = nodes?.find((it) => {
    return it.id == id;
  });
  const config = currentNode?.data.config;

  const [url, setUrl] = useState(config?.url || "");
  const [headers, setHeaders] = useState<Map<string, string>>(
    config?.headers || new Map()
  );
  const [headerKey, setHeaderKey] = useState("");
  const [headerValue, setHeaderValue] = useState("");
  const [selected, setSelected] = useState(getMethod(config));
  const [requestBody, setRequestBody] = useState(config?.body || "");
  const [responseBody, setResponseBody] = useState<ResultProps>();
  const [statusTestRequest, setStatusTestRequest] = useState("none");
  const bodyTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const [blockTitle, setBlockTitle] = useState(currentNode?.data.title || "");

  const addHeader = () => {
    if (headerKey == "" || headerValue == "") return;
    const newState = new Map(headers);
    newState.set(headerKey, headerValue);
    setHeaders(newState);
    setHeaderKey("");
    setHeaderValue("");
  };

  const deleteHeader = (key: string) => {
    const newState = new Map(headers);
    newState.delete(key);
    setHeaders(newState);
  };

  const testRequest = async () => {
    const request: RequestParams = {
      method: selected.name,
      url: url,
      headers: headers,
      body: isEmpty(requestBody)
        ? null
        : JSON.stringify(JSON.parse(requestBody)),
    };
    setStatusTestRequest("waiting");
    setResponseBody(
      await sendRequest(request).then((response: ResultProps) => {
        setStatusTestRequest(response.state);
        return response;
      })
    );
  };

  const isValid = () => {
    return !isEmpty(url);
  };

  const apply = () => {
    let method = "";
    if (nodeProps?.type === "getRequest") {
      method = "GET";
    } else if (nodeProps?.type === "postRequest") {
      method = "POST";
    } else if (nodeProps?.type === "deleteRequest") {
      method = "DELETE";
    } else if (nodeProps?.type === "putRequest") {
      method = "PUT";
    } else if (nodeProps?.type === "httpRequest") {
      method = selected.name;
    }
    const config: MakeRequestConfig = {
      method: method,
      url: url,
      headers: headers,
      body: requestBody,
      isValid: isValid(),
    };
    setNodes((nds: Node[]) =>
      nds.map((node) => {
        if (node.id === id) {
          node.data = {
            ...node.data,
            title: blockTitle,
            config: config,
          };
        }
        return node;
      })
    );
    closeModal();
  };

  const close = () => {
    console.log(config?.headers);
    setUrl(config?.url || "");
    setHeaders(config?.headers || new Map());
    setSelected(getMethod(config));
    setRequestBody(config?.body || "");
    setBlockTitle(currentNode?.data.title || "");
    closeModal();
  };

  return (
    <CustomDialog isOpen={isOpen} closeModal={close} id={id}>
      <div className="flex-1 flex flex-col gap-3 text-primary-100 border-primary-300 border-b-[1px] pb-7">
        <div className="flex justify-between border-primary-300 border-b-[1px] w-full">
          <div className="text-[12.5px] font-semibold mx-[10px] my-[10px] self-center">
            {nodeProps?.description}
          </div>
          <button
            type="button"
            className="flex w-[24px] h-[24px] self-center justify-center items-center rounded-[4px] me-[10px] hover:bg-primary-300/[0.1]"
            onClick={close}
          >
            <Image
              src="/close.svg"
              alt="close"
              width={12}
              height={12}
              className="self-center"
            />
          </button>
        </div>
        <div className="mx-[10px]">
          <div className="text-[11.5px] mb-2">
            Настройте параметры для отправки или получения данных с помощью
            HTTP-запроса
          </div>
          <div className="text-[11.5px] mb-2">
            После выполнения этого блока будут созданы и заполнены следующие
            переменные, которые вы можете использовать в других операциях:
          </div>
          <ul className="text-[11.5px] mb-3">
            <li>
              <div className="text-primary-400 inline-block ps-2">
                response.status
              </div>{" "}
              - статус ответа
            </li>
          </ul>
          <div className="text-[11.5px] mb-2">
            Также в параметрах вы можете использовать созданные переменные,
            обернув их в $&#123;ВАША_ПЕРЕМЕННАЯ&#125;. Виместо этой записи
            подставится значение переменной.
          </div>
          <div className="text-[11.5px] text-primary-400">Название блока</div>
          <input
            value={blockTitle}
            onChange={(e) => setBlockTitle(e.target.value)}
            className="mt-1 w-full px-3 py-1 bg-black/[0.1] border-[0.8px] border-white/[0.14] 
                      rounded-[4px] text-[11.5px] shadow-sm focus:outline-none focus:border-primary-500 disabled:shadow-none"
          />
        </div>
        <Tab.Group>
          <Tab.List className="flex justify-around text-[13px] border-primary-300 border-b-[1px] mx-[10px]">
            <Tab>
              {({ selected }) => (
                <>
                  <div
                    className={
                      selected
                        ? "font-semibold mb-1"
                        : "text-primary-400 hover:text-primary-100 mb-1"
                    }
                  >
                    Настройки
                  </div>
                  <div
                    className={
                      selected
                        ? "border-b-2"
                        : "text-primary-400 hover:text-primary-100 border-primary-200"
                    }
                  />
                </>
              )}
            </Tab>
            <Tab>
              {({ selected }) => (
                <>
                  <div
                    className={
                      selected
                        ? "font-semibold mb-1"
                        : "text-primary-400 hover:text-primary-100 mb-1"
                    }
                  >
                    Тестирование
                  </div>
                  <div
                    className={
                      selected
                        ? "border-b-2 "
                        : "text-primary-400 hover:text-primary-100 border-primary-200"
                    }
                  />
                </>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels className="mx-[10px] text-primary-400">
            <Tab.Panel>
              <>
                {nodeProps?.type === "httpRequest" ? (
                  <CustomListBox
                    parameters={methods}
                    selected={selected}
                    setSelected={setSelected}
                  />
                ) : (
                  <></>
                )}
                <div>
                  <div className="text-[11.5px] text-primary-400 after:content-['*'] after:ml-0.5 after:text-[#ce4c5c]">
                    URL
                  </div>
                  <input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="mt-1 w-full px-3 py-1 bg-black/[0.1] border-[0.8px] border-white/[0.14] 
                      rounded-[4px] text-[11.5px] shadow-sm focus:outline-none focus:border-primary-500 disabled:shadow-none"
                  />
                </div>
                <div className="text-[11.5px]">Заголовки</div>
                <div className="mt-1 w-full py-1 min-h-[50px] bg-black/[0.1] border-[0.8px] border-white/[0.14] rounded-[4px] text-[11.5px] shadow-sm">
                  <div className="flex flex-col gap-1 w-full">
                    {Array.from(headers.entries()).map(([key, value]) => {
                      return (
                        <div
                          key={key}
                          className="flex hover:bg-primary-400/[0.1] px-3 items-center"
                        >
                          {
                            <>
                              <div className="text-primary-400 text-ellipsis max-w-[33ch] overflow-hidden">
                                {key}
                              </div>
                              <div>&nbsp;:&nbsp;</div>
                              <div className="text-primary-100 text-ellipsis max-w-[33ch] overflow-hidden">
                                {value}
                              </div>
                            </>
                          }
                          <button
                            type="button"
                            onClick={() => deleteHeader(key)}
                            className="flex w-[24px] h-[24px] ml-auto self-center justify-center items-center rounded-[4px] me-[10px] hover:bg-primary-400/[0.1]"
                          >
                            <Image
                              className="fill-primary-400 z-10"
                              src="/delete.svg"
                              alt="delete"
                              width={14}
                              height={14}
                            />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    id="key"
                    value={headerKey}
                    onChange={(e) => setHeaderKey(e.target.value)}
                    placeholder="Введите имя..."
                    className="mt-1 w-full px-3 py-1 bg-black/[0.1] border-[0.8px] border-white/[0.14] 
                      rounded-[4px] text-[11.5px] shadow-sm focus:outline-none focus:border-primary-500 disabled:shadow-none"
                  ></input>
                  <input
                    id="value"
                    value={headerValue}
                    onChange={(e) => setHeaderValue(e.target.value)}
                    placeholder="Введите значение..."
                    className="mt-1 w-full px-3 py-1 bg-black/[0.1] border-[0.8px] border-white/[0.14] 
                      rounded-[4px] text-[11.5px] shadow-sm focus:outline-none focus:border-primary-500 disabled:shadow-none"
                  ></input>
                </div>
                <div className="w-full flex mt-2">
                  <button
                    onClick={addHeader}
                    className="bg-primary-500 ml-auto text-primary-100 text-[11.5px] 
                    rounded-[4px] px-[8px] py-[2px] hover:bg-primary-500/[0.5]"
                  >
                    Добавить новый заголовок
                  </button>
                </div>

                <div className="text-[11.5px]">Тело запроса</div>
                <textarea
                  ref={bodyTextAreaRef}
                  value={requestBody}
                  onChange={(e) => {
                    setRequestBody(e.target.value);
                  }}
                  className="mt-1 w-full px-3 py-1 bg-black/[0.1] border-[0.8px] border-white/[0.14] 
                      rounded-[4px] text-[11.5px] shadow-sm focus:outline-none focus:border-primary-500 disabled:shadow-none
                      resize-none scrollable h-24 max-h-72"
                />
              </>
            </Tab.Panel>
            <Tab.Panel>
              <div className="w-full flex mt-2">
                <button
                  onClick={testRequest}
                  className="bg-primary-500 w-full text-primary-100 mb-3
                    text-[11.5px] rounded-[4px] px-[8px] py-[2px] hover:bg-primary-500/[0.5]"
                >
                  Отправить запрос
                </button>
              </div>
              <div className="w-full flex">
                {(() => {
                  switch (statusTestRequest) {
                    case "success":
                      return (
                        <div
                          className="bg-primary-700 w-full text-primary-100 mb-3 border-white/[0.14] border-[0.8px]
                            text-[11.5px] rounded-[4px] flex items-center h-14 justify-between gap-3 px-9"
                        >
                          <div className="flex gap-2 items-center">
                            <Image
                              src="/circle-check.svg"
                              alt="circleCheck"
                              width={20}
                              height={20}
                            />
                            <div>Тестовый запрос выполнен успешно</div>
                          </div>
                          <div>Статус запроса: {responseBody?.status}</div>
                        </div>
                      );
                    case "error":
                      return (
                        <div
                          className="bg-[#cf313b] w-full text-primary-100 mb-3 border-white/[0.14] border-[0.8px]
                            text-[11.5px] rounded-[4px] flex items-center h-fit justify-between gap-3 px-9"
                        >
                          <div className="flex gap-2 items-center">
                            <Image
                              src="/block.svg"
                              alt="circleCheck"
                              width={20}
                              height={20}
                            />
                            <div>
                              <div>Bad Request</div>
                              <p className="text-ellipsis max-w-[50ch] overflow-hidden">
                                {JSON.stringify(responseBody, null, 2)}
                              </p>
                            </div>
                          </div>
                          <div>Статус запроса: {responseBody?.status}</div>
                        </div>
                      );
                    case "waiting":
                      return (
                        <div
                          className="bg-primary-600 w-full text-primary-100 mb-3 border-white/[0.14] border-[0.8px]
                        text-[11.5px] rounded-[4px] flex items-center h-14 justify-center gap-3"
                        >
                          <TailSpin height={14} width={14} />
                          <div>Ожидаем выполнение запроса...</div>
                        </div>
                      );
                    default:
                      return <></>;
                  }
                })()}
              </div>
              {responseBody?.state == "success" && (
                <textarea
                  value={JSON.stringify(responseBody, null, 2)}
                  disabled
                  className="fmt-1 w-full px-3 py-1 bg-black/[0.1] border-[0.8px] border-white/[0.14] 
                      rounded-[4px] text-[11.5px] shadow-sm focus:outline-none focus:border-primary-500 disabled:shadow-none
                      resize-none scrollable h-48 overflow-x-hidden"
                />
              )}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      <div className="flex mx-[10px] mb-2">
        <button
          onClick={apply}
          className="bg-primary-500 ml-auto text-primary-100 text-[11.5px] 
            rounded-[4px] px-[10px] py-[2px] hover:bg-primary-500/[0.5]"
        >
          Применить
        </button>
      </div>
    </CustomDialog>
  );
};

export default MakeRequestDetails;

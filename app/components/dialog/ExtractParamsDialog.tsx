"use client";

import React, { FC, createRef, useContext, useRef, useState } from "react";
import Image from "next/image";
import CustomDialog from "./CustomDialog";
import { CustomDialogProps } from "../flow/flow.types";
import { Tab } from "@headlessui/react";
import { NodeContext } from "../context";
import { Node } from "reactflow";

const PauseDialog: FC<CustomDialogProps> = ({
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

  const [params, setParams] = useState<Map<string, string>>(
    config?.params || new Map()
  );
  const [blockTitle, setBlockTitle] = useState(currentNode?.data.title || "");
  const [param, setParam] = useState("");
  const [value, setValue] = useState("");

  const addParam = () => {
    if (param == "" || value == "") return;
    const newState = new Map(params);
    newState.set(param, value);
    setParams(newState);
    setParam("");
    setValue("");
  };

  const deleteParam = (key: string) => {
    const newState = new Map(params);
    newState.delete(key);
    setParams(newState);
  };

  const isValid = () => {
    return params.size > 0;
  };

  const apply = () => {
    const newConfig = {
      params: params,
      isValid: isValid(),
    };
    setNodes((nds: Node[]) =>
      nds.map((node) => {
        if (node.id === id) {
          node.data = {
            ...node.data,
            title: blockTitle,
            config: newConfig,
          };
        }
        return node;
      })
    );
    closeModal();
  };

  const close = () => {
    setParams(config?.params || new Map());
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
            Вы можете извлечь значения из полученного ответа и сохранить их в
            переменные, чтобы использовать в других операциях
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
          </Tab.List>
          <Tab.Panels className="mx-[10px] text-primary-400">
            <Tab.Panel>
              <div className="grid grid-cols-2 grid-rows-2 gap-x-2">
                <div className="text-[11.5px] text-primary-400 h-1 after:content-['*'] after:ml-0.5 after:text-[#ce4c5c]">
                  Название переменной
                </div>
                <div className="text-[11.5px] text-primary-400 h-1 after:content-['*'] after:ml-0.5 after:text-[#ce4c5c]">
                  Путь к значению (в формате: body.value)
                </div>
                <input
                  id="key"
                  value={param}
                  onChange={(e) => setParam(e.target.value)}
                  placeholder="Введите имя переменной..."
                  className="w-full px-3 py-1 bg-black/[0.1] border-[0.8px] border-white/[0.14] 
                      rounded-[4px] text-[11.5px] shadow-sm focus:outline-none focus:border-primary-500 disabled:shadow-none"
                />
                <input
                  id="value"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Введите путь к значению..."
                  className="w-full px-3 py-1 bg-black/[0.1] border-[0.8px] border-white/[0.14] 
                      rounded-[4px] text-[11.5px] shadow-sm focus:outline-none focus:border-primary-500 disabled:shadow-none"
                />
              </div>
              <div className="w-full flex mt-2">
                <button
                  onClick={addParam}
                  className="bg-primary-500 ml-auto text-primary-100 text-[11.5px] 
                    rounded-[4px] px-[8px] py-[2px] hover:bg-primary-500/[0.5]"
                >
                  Добавить переменную
                </button>
              </div>
              {params.size > 0 && (
                <table className="p-1 w-full border-[0.8px] border-white/[0.14] mt-6 border-spacing-1 border-separate">
                  <thead>
                    <tr className="text-[11.5px]">
                      <th>Переменная</th>
                      <th>Значение</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from(params.entries()).map(([key, value]) => {
                      return (
                        <tr key={key}>
                          <td>
                            <textarea
                              defaultValue={key}
                              readOnly
                              className="h-7 w-full px-3 py-1 bg-black/[0.1] border-[0.8px] border-white/[0.14] 
                        rounded-[4px] text-[11.5px] shadow-sm resize-none scrollable"
                            />
                          </td>
                          <td>
                            <textarea
                              defaultValue={value}
                              readOnly
                              className="h-7 w-full px-3 py-1 bg-black/[0.1] border-[0.8px] border-white/[0.14] 
                        rounded-[4px] text-[11.5px] shadow-sm resize-none scrollable"
                            />
                          </td>
                          <td className="flex items-center">
                            <button
                              type="button"
                              onClick={() => deleteParam(key)}
                              className="flex p-1 self-center justify-center items-center rounded-[4px] me-[10px] hover:bg-primary-400/[0.1]"
                            >
                              <Image
                                className="fill-primary-400 z-10"
                                src="/delete.svg"
                                alt="delete"
                                width={15}
                                height={15}
                              />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      <div className="flex mx-[10px] mb-5">
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

export default PauseDialog;

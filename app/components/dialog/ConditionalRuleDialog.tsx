"use client";

import React, { FC, createRef, useContext, useRef, useState } from "react";
import Image from "next/image";
import CustomDialog from "./CustomDialog";
import { CustomDialogProps } from "../flow/flow.types";
import { Switch, Tab } from "@headlessui/react";
import CustomListBox, { ListParameter } from "../listbox/CustomListBox";
import { NodeContext } from "../context";
import { Node } from "reactflow";
import { Condition } from "../flow/nodes/nodes.config.";
import { hashCode } from "../flow/options/flow.option";

export const conditions: ListParameter[] = [
  { id: 1, name: "РАВНО", f: (a: string, b: string) => a == b },
  { id: 2, name: "НЕ РАВНО", f: (a: string, b: string) => a != b },
  { id: 3, name: "СОДЕРЖИТ", f: (a: string, b: string) => a.includes(b) },
  { id: 4, name: "НЕ СОДЕЖИТ", f: (a: string, b: string) => !a.includes(b) },
  { id: 3, name: "БОЛЬШЕ", f: (a: string, b: string) => a > b },
  { id: 4, name: "БОЛЬШЕ ИЛИ РАВНО", f: (a: string, b: string) => a >= b },
  { id: 3, name: "МЕНЬШЕ", f: (a: string, b: string) => a < b },
  { id: 4, name: "МЕНЬШЕ ИЛИ РАВНО", f: (a: string, b: string) => a <= b },
];

const getCondition = (config: Condition) => {
  return (
    conditions.find((it) => {
      return it.name == config?.condition;
    }) || conditions[0]
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

  const [blockTitle, setBlockTitle] = useState(currentNode?.data.title || "");

  const [param, setParam] = useState("");
  const [expectedValue, setExpectedValue] = useState("");
  const [allConditionsTrue, setAllConditionsTrue] = useState<Condition[]>(
    config?.allConditionsTrue || []
  );

  const [selected, setSelected] = useState(conditions[0]);

  const addCondition = () => {
    if (
      param == "" ||
      expectedValue == "" ||
      allConditionsTrue.filter((it) => {
        return (
          it.param == param &&
          it.condition == selected.name &&
          it.expectedValue == expectedValue
        );
      }).length > 0
    )
      return;

    const newCondition = {
      param: param,
      expectedValue: expectedValue,
      condition: selected.name,
    };
    const newState = [...allConditionsTrue, newCondition];
    setAllConditionsTrue(newState);
    setParam("");
    setExpectedValue("");
  };

  const deleteCondition = (index: number) => {
    const newState = allConditionsTrue.filter((it, i) => {
      return i != index;
    });
    setAllConditionsTrue(newState);
  };

  const apply = () => {
    const newConfig = {
      allConditionsTrue: allConditionsTrue,
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
    setParam("");
    setExpectedValue("");
    setAllConditionsTrue(config?.allConditionsTrue || []);
    setBlockTitle(currentNode?.data.title || "");
    setSelected(conditions[0]);
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
            Задайте условие для выполнения True ветки. Если это условие не
            выполняется, будут выполнены действия в False ветке
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
              <div className="grid grid-cols-3 gap-2">
                <div className="text-[11.5px] text-primary-400 h-1">
                  Параметр
                </div>
                <div></div>
                <div className="text-[11.5px] text-primary-400">Значение</div>
                <textarea
                  value={param}
                  onChange={(e) => setParam(e.target.value)}
                  className="mt-1 w-full px-3 py-1 bg-black/[0.1] border-[0.8px] border-white/[0.14] 
                      rounded-[4px] text-[11.5px] shadow-sm focus:outline-none focus:border-primary-500 
                      disabled:shadow-none resize-none h-[40px] scrollable"
                />
                <div>
                  <CustomListBox
                    parameters={conditions}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </div>
                <textarea
                  value={expectedValue}
                  onChange={(e) => setExpectedValue(e.target.value)}
                  className="mt-1 w-full px-3 py-1 bg-black/[0.1] border-[0.8px] border-white/[0.14] 
                      rounded-[4px] text-[11.5px] shadow-sm focus:outline-none focus:border-primary-500 
                      disabled:shadow-none resize-none h-[40px] max-h-72 scrollable"
                />
              </div>
              <div className="w-full flex mt-2">
                <button
                  onClick={addCondition}
                  className="bg-primary-500 ml-auto text-primary-100 text-[11.5px] 
                    rounded-[4px] px-[8px] py-[2px] hover:bg-primary-500/[0.5]"
                >
                  Добавить условие
                </button>
              </div>
              {allConditionsTrue.length > 0 && (
                <table className="p-1 w-full border-[0.8px] border-white/[0.14] mt-6 border-spacing-1 border-separate">
                  <thead>
                    <tr className="text-[11.5px]">
                      <th>Переменная</th>
                      <th>Условие</th>
                      <th>Ожидаемое значение</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {allConditionsTrue.map((it, index) => {
                      return (
                        <tr
                          key={hashCode(
                            it.param + it.condition + it.expectedValue
                          )}
                        >
                          <td>
                            <textarea
                              defaultValue={it.param}
                              readOnly
                              className="h-7 w-full px-3 py-1 bg-black/[0.1] border-[0.8px] border-white/[0.14] 
                        rounded-[4px] text-[11.5px] shadow-sm resize-none scrollable"
                            />
                          </td>
                          <td>
                            <textarea
                              defaultValue={it.condition}
                              readOnly
                              className="h-7 w-full px-3 py-1 bg-black/[0.1] border-[0.8px] border-white/[0.14] 
                        rounded-[4px] text-[11.5px] shadow-sm resize-none scrollable"
                            />
                          </td>
                          <td>
                            <textarea
                              defaultValue={it.expectedValue}
                              readOnly
                              className="h-7 w-full px-3 py-1 bg-black/[0.1] border-[0.8px] border-white/[0.14] 
                        rounded-[4px] text-[11.5px] shadow-sm resize-none scrollable"
                            />
                          </td>
                          <td className="flex items-center">
                            <button
                              type="button"
                              onClick={() => deleteCondition(index)}
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

export default MakeRequestDetails;

"use client";

import React, { FC, useContext, useState } from "react";
import Image from "next/image";
import CustomDialog from "./CustomDialog";
import { CustomDialogProps } from "../flow/flow.types";
import { Tab } from "@headlessui/react";
import CustomListBox, { ListParameter } from "../listbox/CustomListBox";
import { NodeContext } from "../context";
import { Node } from "reactflow";

const conditions: ListParameter[] = [
  { id: 1, name: "РАВНО" },
  { id: 2, name: "НЕ РАВНО" },
  { id: 3, name: "СОДЕРЖИТ" },
  { id: 4, name: "НЕ СОДЕЖИТ" },
];

const MakeRequestDetails: FC<CustomDialogProps> = ({
  isOpen,
  closeModal,
  id,
  nodeProps,
}: CustomDialogProps) => {
  const [param, setParam] = useState("");
  const [value, setValue] = useState("");

  const { setNodes, nodes } = useContext(NodeContext);

  const [selected, setSelected] = useState(conditions[0]);

  const apply = () => {
    const config = {
      param: param,
      value: value,
      condition: selected.name,
    };
    setNodes((nds: Node[]) =>
      nds.map((node) => {
        if (node.id === id) {
          node.data = {
            ...node.data,
            config: config,
          };
        }
        return node;
      })
    );
    closeModal();
  };

  return (
    <CustomDialog isOpen={isOpen} closeModal={closeModal} id={id}>
      <div className="flex-1 flex flex-col gap-3 text-primary-100 border-primary-300 border-b-[1px] pb-7">
        <div className="flex justify-between border-primary-300 border-b-[1px] w-full">
          <div className="text-[12.5px] font-semibold mx-[10px] my-[10px] self-center">
            {nodeProps?.description}
          </div>
          <button
            type="button"
            className="flex w-[24px] h-[24px] self-center justify-center items-center rounded-[4px] me-[10px] hover:bg-primary-300/[0.1]"
            onClick={closeModal}
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
            className="mt-1 w-full px-3 py-1 bg-black/[0.1] border-[0.8px] border-white/[0.14] 
                      rounded-[4px] text-[11.5px] shadow-sm focus:outline-none focus:border-primary-500 disabled:shadow-none"
          ></input>
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
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="mt-1 w-full px-3 py-1 bg-black/[0.1] border-[0.8px] border-white/[0.14] 
                      rounded-[4px] text-[11.5px] shadow-sm focus:outline-none focus:border-primary-500 
                      disabled:shadow-none resize-none min-h-[150px] max-h-72 scrollable"
                  />
                </div>
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

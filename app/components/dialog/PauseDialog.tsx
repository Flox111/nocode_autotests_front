"use client";

import React, { FC, createRef, useContext, useRef, useState } from "react";
import Image from "next/image";
import CustomDialog from "./CustomDialog";
import { CustomDialogProps } from "../flow/flow.types";
import { Tab } from "@headlessui/react";
import CustomListBox, { ListParameter } from "../listbox/CustomListBox";
import { NodeContext } from "../context";
import { Node } from "reactflow";
import { ConditionConfig } from "../flow/nodes/nodes.config.";

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

  const [value, setValue] = useState(config?.value || "");
  const [blockTitle, setBlockTitle] = useState(currentNode?.data.title || "");

  const apply = () => {
    const newConfig = {
      value: value,
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
    setValue(config?.value || "");
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
            Задайте время (мс), в течении которого запущенный сценарий остановит свое выполнение
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
                <div className="text-[11.5px] mb-4 text-primary-400 h-1 after:content-['*'] after:ml-0.5 after:text-[#ce4c5c]">
                  Пауза (мс)
                </div>
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="mt-1 w-full px-3 py-1 bg-black/[0.1] border-[0.8px] border-white/[0.14] 
                      rounded-[4px] text-[11.5px] shadow-sm focus:outline-none focus:border-primary-500 disabled:shadow-none"
                />
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

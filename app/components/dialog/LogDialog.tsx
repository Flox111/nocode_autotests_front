"use client";

import React, { FC, createRef, useContext, useRef, useState } from "react";
import Image from "next/image";
import CustomDialog from "./CustomDialog";
import { LogDialogProps } from "../flow/flow.types";

export interface Log {
  time: string;
  message: string;
}

const PauseDialog: FC<LogDialogProps> = ({
  isOpen,
  closeModal,
  logs,
}: LogDialogProps) => {
  return (
    <CustomDialog isOpen={isOpen} closeModal={closeModal}>
      <div className="flex-1 flex flex-col gap-0 text-primary-100 border-primary-300 border-b-[1px] pb-7">
        <div className="flex justify-between border-primary-300 border-b-[1px] w-full">
          <div className="text-[12.5px] font-semibold mx-[10px] my-[10px] self-center">
            Журнал выполнения операций
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
        {logs.length > 0 && (
          <table className="p-1 w-full border-b-[0.8px] border-white/[0.14] border-spacing-1 border-separate">
            <thead>
              <tr className="text-[11.5px]">
                <th>Время</th>
                <th>Сообщение</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((it, index) => {
                return (
                  <tr key={index}>
                    <td
                      width={20}
                      className="h-7 px-3 py-1 bg-black/[0.1] border-[0.8px] border-white/[0.14] 
                        rounded-[4px] text-[11.5px] shadow-sm resize-none scrollable"
                    >
                      {it.time}
                    </td>
                    <td
                      className="h-fit px-3 py-1 bg-black/[0.1] border-[0.8px] border-white/[0.14] 
                        rounded-[4px] text-[11.5px] shadow-sm whitespace-pre-wrap scrollable"
                    >
                      {it.message}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </CustomDialog>
  );
};

export default PauseDialog;

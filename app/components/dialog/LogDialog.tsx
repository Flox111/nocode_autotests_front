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
      <div className="flex-1 flex flex-col gap-3 text-primary-100 border-primary-300 border-b-[1px] pb-7">
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
        <div
          className="mt-1 mx-[10px] py-1 min-h-[50px] max-h-[550px] bg-black/[0.1] border-[0.8px] 
          border-white/[0.14] rounded-[4px] text-[11.5px] shadow-sm scrollable overflow-auto"
        >
          {logs.map((it, index) => {
            return (
              <div
                key={index}
                className="px-3 text-primary-100 text-ellipsis whitespace-pre-wrap"
              >
                {it.time} {it.message}
              </div>
            );
          })}
        </div>
      </div>
    </CustomDialog>
  );
};

export default PauseDialog;

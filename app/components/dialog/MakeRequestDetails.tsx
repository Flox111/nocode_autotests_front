"use client";

import React, { FC, Fragment } from "react";
import Image from "next/image";
import CustomDialog from "./CustomDialog";
import { CustomDialogProps } from "../flow/flow.types";
import { Tab } from "@headlessui/react";
import CustomListBox from "../listbox/CustomListBox";

const MakeRequestDetails: FC<CustomDialogProps> = ({
  isOpen,
  closeModal,
}: CustomDialogProps) => {
  return (
    <CustomDialog isOpen={isOpen} closeModal={closeModal}>
      <div className="flex-1 flex flex-col gap-3 text-[#f5f5f5]">
        <div className="flex justify-between border-[#3b3b3b] border-b-[1px] w-full">
          <div className="text-[12.5px] font-semibold mx-[10px] my-[10px] self-center">
            Make HTTP request
          </div>
          <button
            type="button"
            className="flex w-[24px] h-[24px] self-center justify-center items-center rounded-[4px] me-[10px] hover:bg-[#bdbdbd]/[0.1]"
            onClick={closeModal}
          >
            <Image
              src="/close.svg"
              alt="close"
              width={12}
              height={12}
              className=" self-center"
            />
          </button>
        </div>
        <div className="mx-[10px]">
          <div className="text-[11.5px] mb-2">
            Set up the action to send or receive data using the HTTP request.
          </div>
          <div className="text-[11.5px] text-[#bdbdbd]">Block name</div>
          <input
            className="mt-1 w-full px-3 py-1 bg-[#000000]/[0.1] border-[0.8px] border-[#ffffff]/[0.14] 
                      rounded-[4px] text-[11.5px] shadow-sm focus:outline-none focus:border-[#007df0] disabled:shadow-none"
          ></input>
        </div>
        <Tab.Group>
          <Tab.List className="flex justify-around text-[13px] border-[#3b3b3b] border-b-[1px] mx-[10px]">
            <Tab>
              {({ selected }) => (
                <>
                  <div
                    className={
                      selected
                        ? "font-semibold mb-1"
                        : "text-[#bdbdbd] hover:text-[#f5f5f5] mb-1"
                    }
                  >
                    Settings
                  </div>
                  <div
                    className={
                      selected
                        ? "border-b-2"
                        : "text-[#bdbdbd] hover:text-[#f5f5f5] border-[#1e1e1e]"
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
                        : "text-[#bdbdbd] hover:text-[#f5f5f5] mb-1"
                    }
                  >
                    Output
                  </div>
                  <div
                    className={
                      selected
                        ? "border-b-2 "
                        : "text-[#bdbdbd] hover:text-[#f5f5f5] border-[#1e1e1e]"
                    }
                  />
                </>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels className="mx-[10px] text-[#bdbdbd]">
            <Tab.Panel>
              <>
                <CustomListBox/>
                <div className="text-[11.5px]">Body</div>
                <textarea
                  className="fmt-1 w-full px-3 py-1 bg-[#000000]/[0.1] border-[0.8px] border-[#ffffff]/[0.14] 
                      rounded-[4px] text-[11.5px] shadow-sm focus:outline-none focus:border-[#007df0] disabled:shadow-none
                      resize-none scrollable h-72"
                ></textarea>
                
              </>
            </Tab.Panel>
            <Tab.Panel>Content 2</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </CustomDialog>
  );
};

export default MakeRequestDetails;

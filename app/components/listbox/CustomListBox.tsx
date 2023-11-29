import { Listbox, Transition } from "@headlessui/react";
import React, { FC, Fragment, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export type ListParameter = {
  id: number;
  name: string;
  f?: (a: string, b: string) => boolean
};

export type CustomListBoxProps = {
  parameters: ListParameter[];
  selected: any;
  setSelected: any;
};

const CustomListBox: FC<CustomListBoxProps> = ({
  parameters,
  selected,
  setSelected,
}) => {
  return (
    <>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1 mb-2 z-20">
          <Listbox.Button
            className="text-[10px] text-primary-100 relative w-full cursor-default rounded-lg bg-[#373737] 
          py-1 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 
          focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 
          focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300"
          >
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className="absolute mt-1 max-h-50 w-full overflow-auto rounded-md bg-[#383838] 
            py-1 text-[10px] text-primary-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              {parameters.map((parameter, id) => (
                <Listbox.Option
                  key={id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-1 pl-10 pr-4 ${
                      active ? "bg-[#444444]" : ""
                    }`
                  }
                  value={parameter}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {parameter.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-100">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </>
  );
};

export default CustomListBox;

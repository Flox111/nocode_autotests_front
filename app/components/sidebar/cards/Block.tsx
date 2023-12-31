import { useState } from "react";
import { BlockProps } from "./card.types";
import Image from "next/image";

const Block = ({ children, title }: BlockProps) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-[#3b3b3b] w-full [&:not(:last-child)]:border-b-[1px]">
      <div
        onClick={() =>
          setOpen((prev) => {
            return !prev;
          })
        }
        className="flex pb-2 pt-2 items-center"
      >
        <h2 className="text-primary-100 text-[13px] font-semibold ps-3">
          {title}
        </h2>
        <div className="ml-auto pr-3">
          {open ? (
            <Image
              src="/ChevronSmallDownIcon.svg"
              alt="state"
              height={16}
              width={16}
            />
          ) : (
            <Image
              src="/ChevronSmallRightIcon.svg"
              alt="state"
              height={16}
              width={16}
            />
          )}
        </div>
      </div>
      {open && <div className="grid grid-cols-3 gap-y-2 mb-1">{children}</div>}
    </div>
  );
};

export default Block;

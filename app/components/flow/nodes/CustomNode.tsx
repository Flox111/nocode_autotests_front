import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import { CustomNodeProps } from "../flow.types";
import Image from "next/image";

const CustomNode = ({ data }: { data: CustomNodeProps }) => {
  return (
    <div className="bg-[#444444] w-[320px] h-[61.6px] shadow-xl border-[1.6px] border-[#212121]">
      <div className="flex justify-start ms-1">
        <div className="bg-[#006acc] m-[10px] h-[36px] w-[36px] rounded-[4px] flex justify-center items-center">
          <Image
            className="h-[20px] w-[20px]"
            src={data.icon}
            alt="location"
            width={20}
            height={20}
          />
        </div>
        <div className="flex flex-col text-[#ffffff] self-center">
          <div className="font-semibold text-[13.5px]">{data.title}</div>
          <div className="text-[12.5px]">{data.description}</div>
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Top}
      />
      <Handle
        type="source"
        position={Position.Bottom}
      />
    </div>
  );
};

export default memo(CustomNode);

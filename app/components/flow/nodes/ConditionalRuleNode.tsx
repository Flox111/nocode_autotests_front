import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import { CustomNodeProps } from "../flow.types";
import Image from "next/image";
import useValidatorFn from "../utils/Validation";

const ConditionalRuleNode = ({ data }: { data: CustomNodeProps }) => {
  const color = data.color || "#006acc";
  return (
    <div className="bg-[#444444] w-[320px] h-[61.6px] shadow-xl border-[1.6px] border-[#212121] rounded-[32px]">
      <div className="flex justify-start ms-1">
        <div
          style={{
            backgroundColor: color,
          }}
          className="m-[10px] h-[36px] w-[36px] rounded-full flex justify-center items-center"
        >
          <Image
            className="h-[20px] w-[20px]"
            src={data.icon}
            alt="location"
            width={20}
            height={20}
          />
        </div>
        <div className="flex flex-col text-white self-center">
          <div className="font-semibold text-[13.5px]">{data.title}</div>
          <div className="text-[12.5px]">{data.description}</div>
        </div>
      </div>
      <Handle id="target_1" type="target" position={Position.Top} />
      <Handle id="true" type="source" position={Position.Left} isValidConnection={useValidatorFn()}/>
      <Handle id="false" type="source" position={Position.Right} isValidConnection={useValidatorFn()}/>
    </div>
  );
};

export default memo(ConditionalRuleNode);

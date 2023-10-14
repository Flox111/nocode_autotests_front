import React, { memo, useState } from "react";
import { Handle, Position } from "reactflow";
import { CustomNodeProps } from "../flow.types";
import Image from "next/image";
import useValidatorFn from "../utils/Validation";

const CustomNode = ({ data }: { data: CustomNodeProps }) => {
  const color = data.color || "#006acc";
  
  const getColorForStatus = () => {
    switch (data.state) {
      case "success":
        return "green";
      case "fail":
        return "red";
      case "process":
        return "yellow";
      default:
        return "";
    }
  };

  return (
    <div className="bg-[#444444] w-[320px] h-[61.6px] shadow-xl border-[1.6px] border-[#212121] rounded-[6px]">
      <div className="flex justify-start ms-1">
        <div
          style={{
            backgroundColor: color,
          }}
          className="m-[10px] h-[36px] w-[36px] rounded-[4px] flex justify-center items-center"
        >
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
        <div
          style={{
            backgroundColor: getColorForStatus(),
          }}
          className="w-3 h-3 ml-auto mr-2 mt-2"
        ></div>
      </div>
      <Handle id="target_1" type="target" position={Position.Top} />
      <Handle
        id="source_1"
        type="source"
        position={Position.Bottom}
        isValidConnection={useValidatorFn()}
      />
    </div>
  );
};

export default memo(CustomNode);

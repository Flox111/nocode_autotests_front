import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import { CustomNodeProps } from "../flow.types";
import Image from "next/image";
import useValidatorFn from "../utils/Validation";
import { getImageForState, getShadowCssPropertyForNode } from "../options/flow.option";

const FinishTriggerNode = ({ data }: { data: CustomNodeProps }) => {
  const color = data.color || "#006acc";

  return (
    <div
      style={{
        boxShadow: getShadowCssPropertyForNode(data.state),
        borderWidth: data.state == "none" ? "1.6px" : "",
        borderColor: data.state == "none" ? "#212121" : "",
      }}
      className="bg-[#444444] w-[320px] h-[61.6px]"
    >
      <div className="flex justify-start ms-1">
        <div
          style={{
            backgroundColor: color,
          }}
          className="m-[10px] h-[36px] w-[36px] flex justify-center items-center"
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
          <div className="font-semibold text-[13.5px]">{data.description}</div>
        </div>
      </div>
      <Handle
        id="target_1"
        type="target"
        position={Position.Top}
        isValidConnection={useValidatorFn()}
      />
    </div>
  );
};

export default memo(FinishTriggerNode);

import React, { FC, memo, useState } from "react";
import { Handle, Position } from "reactflow";
import { CustomNodeProps } from "../flow.types";
import Image from "next/image";
import useValidatorFn from "../utils/Validation";
import { getImageForState, getShadowCssPropertyForNode } from "../options/flow.option";
import MakeRequestDetails from "../../dialog/MakeRequestDetails";

const MakeRequestNode = ({
  id,
  data,
}: {
  data: CustomNodeProps;
  id: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const color = data.color || "#006acc";
  const image = getImageForState(data.state);

  return (
    <div
      onClick={() => setIsOpen(true)}
      style={{
        boxShadow: getShadowCssPropertyForNode(data.state),
        borderWidth: data.state == 'none' ? '1.6px' : "",
        borderColor: data.state == 'none' ? '#212121' : ""
      }}
      className="bg-[#444444] w-[320px] h-[61.6px] rounded-[6px]"
    >
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
        <div className="flex flex-col text-white self-center">
          <div className="font-semibold text-[13.5px]">{data.title}</div>
          <div className="text-[12.5px]">{data.description}</div>
        </div>
        {image && (
          <Image
            src={image}
            className="ml-auto mr-2 mt-2 self-start"
            alt="state"
            height={16}
            width={16}
          />
        )}
      </div>
      <MakeRequestDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        id={id}
        nodeProps={data}
      />
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

export default memo(MakeRequestNode);

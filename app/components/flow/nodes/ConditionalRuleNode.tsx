import React, { memo, useState } from "react";
import { Handle, Position } from "reactflow";
import { CustomNodeProps } from "../flow.types";
import Image from "next/image";
import useValidatorFn from "../utils/Validation";
import ConditionalRuleDialog from "../../dialog/ConditionalRuleDialog";
import { getShadowCssPropertyForNode, isEmpty } from "../options/flow.option";
import { ConditionConfig } from "./nodes.config.";

const ConditionalRuleNode = ({
  id,
  data,
}: {
  data: CustomNodeProps;
  id: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const color = data.color || "#006acc";

  const config = data.config as ConditionConfig;

  const isValid = () => {
    console.log(config)
    return (
      config != null &&
      !isEmpty(config.param) &&
      !isEmpty(config.value) &&
      !isEmpty(config.condition)
    );
  };

  let image = null;
  if (!isValid()) {
    image = "/customize.svg";
  }

  return (
    <div
      style={{
        boxShadow: getShadowCssPropertyForNode(data.state),
        borderWidth: data.state == "none" ? "1.6px" : "",
        borderColor: data.state == "none" ? "#212121" : "",
      }}
      onClick={() => setIsOpen(true)}
      className="bg-[#444444] w-[320px] h-[61.6px] rounded-[32px]"
    >
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
        {image && (
          <Image
            src={image}
            className="ml-auto mr-3 mt-3 self-start"
            alt="state"
            height={16}
            width={16}
          />
        )}
      </div>
      <ConditionalRuleDialog
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        id={id}
        nodeProps={data}
      />
      <Handle id="target_1" type="target" position={Position.Top} />
      <Handle
        id="true"
        type="source"
        position={Position.Left}
        isValidConnection={useValidatorFn()}
      />
      <Handle
        id="false"
        type="source"
        position={Position.Right}
        isValidConnection={useValidatorFn()}
      />
    </div>
  );
};

export default memo(ConditionalRuleNode);

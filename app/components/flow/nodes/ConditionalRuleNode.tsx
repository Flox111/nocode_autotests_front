import React, { memo, useContext, useState } from "react";
import { Handle, Position } from "reactflow";
import { CustomNodeProps } from "../flow.types";
import Image from "next/image";
import useValidatorFn from "../utils/Validation";
import ConditionalRuleDialog from "../../dialog/ConditionalRuleDialog";
import {
  deleteNode,
  getShadowCssPropertyForNode,
  isEmpty,
} from "../options/flow.option";
import { ConditionConfig } from "./nodes.config.";
import { NodeContext } from "../../context";

const ConditionalRuleNode = ({
  id,
  data,
}: {
  data: CustomNodeProps;
  id: string;
}) => {
  const { nodes, setNodes, edges, setEdges } = useContext(NodeContext);

  const [isOpen, setIsOpen] = useState(false);
  const color = data.color || "#006acc";

  const config = data.config as ConditionConfig;

  let image = null;
  if (config == null || !config.isValid) {
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
      className="bg-[#444444] w-[320px] h-[61.6px] rounded-[32px] group"
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
      <div
        className="w-[46px] h-[46px] hidden group-hover:block absolute 
        right-[-35px] top-[-25px] rounded-[4px] me-[10px]"
      >
        <div className="w-full h-full flex justify-end items-start">
          <button
            onClick={() => deleteNode(id, nodes, setNodes, edges, setEdges)}
            className="w-[24px] h-[24px] self-start hover:bg-primary-300/[0.1]"
          >
            <Image src="/close.svg" alt="close" width={14} height={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(ConditionalRuleNode);

import React, { memo, useContext } from "react";
import { Handle, Position } from "reactflow";
import { CustomNodeProps } from "../flow.types";
import Image from "next/image";
import useValidatorFn from "../utils/Validation";
import {
  deleteNode,
  getShadowCssPropertyForNode,
} from "../options/flow.option";
import { NodeContext } from "../../context";

const StartTriggerNode = ({
  id,
  data,
}: {
  data: CustomNodeProps;
  id: string;
}) => {
  const { nodes, setNodes, edges, setEdges } = useContext(NodeContext);

  const color = data.color || "#006acc";

  return (
    <div
      style={{
        boxShadow: getShadowCssPropertyForNode(data.state),
        borderWidth: data.state == "none" ? "1.6px" : "",
        borderColor: data.state == "none" ? "#212121" : "",
      }}
      className="bg-[#444444] w-[320px] h-[61.6px] rounded-[6px] group"
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
          <div className="font-semibold text-[13.5px]">{data.description}</div>
        </div>
      </div>
      <Handle id="target_1" type="target" position={Position.Top} />
      <Handle
        id="source_1"
        type="source"
        position={Position.Bottom}
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

export default memo(StartTriggerNode);

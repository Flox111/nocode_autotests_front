"use client";

import Image from "next/image";
import { BlockCardProps } from "./card.types";
import { useContext } from "react";
import { NodeContext } from "../../context";
import { addNewNode } from "../../flow/options/flow.option";

const BlockCard = ({ type, description, icon, color }: BlockCardProps) => {
  const { nodes, setNodes, nodeCount, setNodeCount } = useContext(NodeContext);

  const onClick = () => {
    addNewNode(
      type,
      description,
      icon,
      color,
      nodes,
      setNodes,
      nodeCount,
      setNodeCount
    );
  };

  return (
    <div
      className="flex flex-col w-[80px] items-center h-full gap-1 hover:bg-primary-400/[0.1]"
      onClick={onClick}
    >
      <div
        style={{
          backgroundColor: color,
        }}
        className="m-[10px] h-[36px] w-[36px] rounded-[4px] flex justify-center items-center"
      >
        <Image
          className="h-[20px] w-[20px]"
          src={icon}
          alt="location"
          width={20}
          height={20}
        />
      </div>
      <p className="text-[12px] text-center text-[#a3a3a3] leading-3 pb-[10px] px-[4px]">
        {description}
      </p>
    </div>
  );
};

export default BlockCard;

"use client";

import Image from "next/image";
import { BlockCardProps } from "./card.types";
import { useContext } from "react";
import { NodeContext } from "../../context";

const BlockCard = (data: BlockCardProps) => {
  const bgColor = data.color || "#006acc";
  const icon = data.icon || "/location.svg";

  const {
    setNodes,
    nodeCount,
    setNodeCount
  } = useContext(NodeContext);

  const onAdd = () => {
    const newNode = {
      id: nodeCount.toString(),
      type: "custom",
      data: {
        title: "Block 5",
        description: "Make HTTP request",
        icon: "/location.svg",
        color: "#006acc",
      },
      position: { x: 0, y: 0 },
    };
    setNodeCount(nodeCount + 1);
    setNodes((nds: any[]) => nds.concat(newNode));
  };

  return (
    <div
      className="flex flex-col justify-center w-[80px] items-center h-full gap-1"
      onClick={onAdd}
    >
      <div
        className={`bg-[${bgColor}] m-[10px] h-[36px] w-[36px] rounded-[4px] flex justify-center items-center`}
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
        {data.title}
      </p>
    </div>
  );
};

export default BlockCard;

"use client";

import Image from "next/image";
import { BlockCardProps } from "./card.types";
import { useContext } from "react";
import { NodeContext } from "../../context";

const BlockCard = ({ type, description, icon, color }: BlockCardProps) => {
  const { setNodes, nodeCount, setNodeCount } = useContext(NodeContext);
  const onAdd = () => {
    const newNode = {
      id: nodeCount.toString(),
      type: type,
      data: {
        title: `Block ${nodeCount + 1}`,
        description: description,
        icon: icon,
        color: color,
        state: "none"
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

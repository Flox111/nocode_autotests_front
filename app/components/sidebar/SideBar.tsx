import Image from "next/image";
import BlockCard from "./cards/BlockCard";
import Block from "./cards/Block";

const SideBar = () => {
  return (
    <div className="bg-[#1e1e1e] border-r-[1px] border-[#3b3b3b] w-[300px]">
      <div className="border-[#3b3b3b] border-b-[1px] w-full">
        <h2 className="text-[#f5f5f5] text-[13.5px] font-semibold ms-4 my-3">
          Add blocks
        </h2>
      </div>

      <Block title="Action">
        <BlockCard title="Make HTTP request"/>
        <BlockCard title="Make HTTP request"/>
        <BlockCard title="Make HTTP request"/>
        <BlockCard title="Make HTTP request"/>
        <BlockCard title="Make HTTP request"/>
        <BlockCard title="Make HTTP request"/>
      </Block>

      <Block title="Utilities">
        <BlockCard title="Conditional rule" color="#a3a3a3" icon="conditional.svg"/>
      </Block>
    </div>
  );
};

export default SideBar;

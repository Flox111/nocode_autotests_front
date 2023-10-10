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
        <BlockCard />
        <BlockCard />
        <BlockCard />
        <BlockCard />
        <BlockCard />
        <BlockCard />
      </Block>

      <Block title="Utilities">
        <BlockCard />
      </Block>
    </div>
  );
};

export default SideBar;

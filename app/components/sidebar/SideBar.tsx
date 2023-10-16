import Image from "next/image";
import BlockCard from "./cards/BlockCard";
import Block from "./cards/Block";

const SideBar = () => {
  return (
    <div className="bg-[#1e1e1e] border-r-[1px] border-[#3b3b3b] w-[250px] shrink-0">
      <div className="border-[#3b3b3b] border-b-[1px] w-full">
        <h2 className="text-[#f5f5f5] text-[13.5px] font-semibold ms-4 my-3">
          Add blocks
        </h2>
      </div>

      <Block title="Action">
        <BlockCard type='startTriggerNode' description="Start this flow" color="#1e1e1e" icon="/trigger.svg"/>
        <BlockCard type='finishTriggerNode' description="Finish this flow" color="#12a867" icon="/trigger.svg"/>
        <BlockCard type='customNode' description="Make HTTP request" color="#006acc" icon="/location.svg"/>
        <BlockCard type='customNode' description="Make HTTP request" color="#006acc" icon="/location.svg"/>
        <BlockCard type='customNode' description="Make HTTP request" color="#006acc" icon="/location.svg"/>
        <BlockCard type='customNode' description="Make HTTP request" color="#006acc" icon="/location.svg"/>
      </Block>

      <Block title="Utilities">
        <BlockCard type='conditionalRule' description="Conditional rule" color="#a3a3a3" icon="conditional.svg"/>
      </Block>
    </div>
  );
};

export default SideBar;

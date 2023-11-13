import Image from "next/image";
import BlockCard from "./cards/BlockCard";
import Block from "./cards/Block";

const SideBar = () => {
  return (
    <div className="bg-primary-200 border-r-[1px] border-[#3b3b3b] w-[250px] shrink-0">
      <div className="border-[#3b3b3b] border-b-[1px] w-full">
        <h2 className="text-primary-100 text-[13.5px] font-semibold ms-4 my-3">
          Блоки
        </h2>
      </div>

      <Block title="Действие">
        <BlockCard type='startTriggerNode' description="Запустить сценарий" color="#1e1e1e" icon="/trigger.svg"/>
        <BlockCard type='finishTriggerNode' description="Завершить сценарий" color="#12a867" icon="/trigger.svg"/>
        <BlockCard type='httpRequest' description="HTTP запрос" color="#006acc" icon="/location.svg"/>
        <BlockCard type='getRequest' description="GET запрос" color="#006acc" icon="/location.svg"/>
        <BlockCard type='postRequest' description="POST запрос" color="#006acc" icon="/location.svg"/>
        <BlockCard type='deleteRequest' description="DELETE запрос" color="#006acc" icon="/location.svg"/>
        <BlockCard type='putRequest' description="PUT запрос" color="#006acc" icon="/location.svg"/>
      </Block>

      <Block title="Утилиты">
        <BlockCard type='conditionalRule' description="Условное правило" color="#a3a3a3" icon="conditional.svg"/>
      </Block>
    </div>
  );
};

export default SideBar;

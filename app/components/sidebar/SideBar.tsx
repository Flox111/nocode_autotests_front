import Image from "next/image";
import BlockCard from "./cards/BlockCard";
import Block from "./cards/Block";

const SideBar = () => {
  return (
    <div className="bg-primary-200 border-r-[1px] border-[#3b3b3b] w-[250px] shrink-0 overflow-auto scrollable h-[94%]">
      <div className="border-[#3b3b3b] border-b-[1px] w-full">
        <h2 className="text-primary-100 text-[13.5px] font-semibold ms-2 my-3">
          Блоки
        </h2>
      </div>

      <Block title="Управляющие">
        <BlockCard type='startNode' description="Запустить сценарий" color="#1e1e1e" icon="/trigger.svg"/>
        <BlockCard type='finishSuccessNode' description="Сценарий успешно выполнен" color="#12a867" icon="/trigger.svg"/>
        <BlockCard type='finishErrorNode' description="Сценарий не выполнен" color="#ce4c5c" icon="/trigger.svg"/>
        <BlockCard type='pauseNode' description="Поставить на паузу" color="#fdb52a" icon="/pause.svg"/>
      </Block>

      <Block title="Работа с сетью">
        <BlockCard type='httpRequest' description="HTTP запрос" color="#774fe8" icon="/location.svg"/>
        <BlockCard type='getRequest' description="GET запрос" color="#006acc" icon="/location.svg"/>
        <BlockCard type='postRequest' description="POST запрос" color="#006acc" icon="/location.svg"/>
        <BlockCard type='deleteRequest' description="DELETE запрос" color="#006acc" icon="/location.svg"/>
        <BlockCard type='putRequest' description="PUT запрос" color="#006acc" icon="/location.svg"/>
      </Block>

      <Block title="Условные">
        <BlockCard type='conditionalRule' description="Условное правило" color="#a3a3a3" icon="conditional.svg"/>
      </Block>
    </div>
  );
};

export default SideBar;

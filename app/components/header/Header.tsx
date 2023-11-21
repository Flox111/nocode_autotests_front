import { NodeContext } from "../context";
import { useContext } from "react";
import { resetFlow, runFlow } from "../flow/utils/RunFlow";

const Header = () => {
  const { setNodes, nodes, edges } = useContext(NodeContext);

  const start = () => {
    runFlow(nodes, edges, setNodes);
  };

  const reset = () => {
    resetFlow(nodes, setNodes);
  };

  return (
    <div className="bg-primary-200 py-[10px] h-[6%] border-[#3b3b3b] border-b-[1px]">
      <div className="grid grid-cols-3">
        <div></div>
        <h2 className="text-[#d9d9d9] text-[18px] font-semibold justify-self-center">
          Сценарии / Новый сценарий
        </h2>
        <div className="text-[#d9d9d9] text-[12px] mr-[10px] self-center justify-self-end">
          <button
            onClick={start}
            className="bg-[#444444] rounded-[4px] px-[8px] hover:bg-primary-400/[0.5] mr-1"
          >
            Запустить сценарий
          </button>
          <button
            onClick={reset}
            className="bg-[#444444] rounded-[4px] px-[8px] hover:bg-primary-400/[0.5]"
          >
            Сброс
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

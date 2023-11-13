import { NodeContext } from "../context";
import { useContext } from "react";
import runFlow from "../flow/utils/RunFlow";

const Header = () => {
  const { setNodes, nodes, edges} = useContext(NodeContext);

  const onClick = () => {
    runFlow(nodes, edges, setNodes)
  }

  return (
    <div className="bg-primary-200 h-[48px] py-[10px]">
      <div className="grid grid-cols-3">
        <div></div>
        <h2 className="text-[#d9d9d9] text-[18px] font-semibold justify-self-center">
          Сценарии / Новый сценарий
        </h2>
        <div className="text-[#d9d9d9] text-[12px] mr-[10px] self-center justify-self-end">
          <button
            onClick={onClick}
            className="bg-[#444444] rounded-[4px] px-[8px] hover:bg-primary-400/[0.5]"
          >
            Запустить сценарий
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;


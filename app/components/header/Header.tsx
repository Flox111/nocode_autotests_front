import { Node, getConnectedEdges, useReactFlow } from "reactflow";
import { NodeContext } from "../context";
import { useContext } from "react";
import useValidatorFn from "../flow/utils/Validation";
import useRunFlow from "../flow/utils/RunFlow";
import runFlow from "../flow/utils/RunFlow";

const Header = () => {
  const { setNodes, nodes, edges} = useContext(NodeContext);
  // const { getNode, getEdges } = useReactFlow();
  const onClick = () => {
    runFlow(nodes, edges, setNodes)
  }
  // const runFlow = () => {
  //   const startNode = nodes?.find((it) => it.type == "startTriggerNode");
  //   console.log(nodes)
  //   if (startNode != null) {
  //     setNodes((nds: Node[]) =>
  //       nds.map((node) => {
  //         if (node.id === startNode.id) {
  //           node.data = {
  //             ...node.data,
  //             state: "success",
  //           };
  //         }
  //         return node;
  //       })
  //     );
  //   }
  // };

  // const flow = (currentNode: Node) => {
  //   if (currentNode != null) {
  //     setNodes((nds: Node[]) =>
  //       nds.map((node) => {
  //         if (node.id === currentNode.id) {
  //           node.data = {
  //             ...node.data,
  //             state: "success",
  //           };

  //         }
  //         //return node;
  //       })
  //     );
  //   }
  // } 
  return (
    <div className="bg-[#1e1e1e] h-[48px] py-[10px]">
      <div className="grid grid-cols-3">
        <div></div>
        <h2 className="text-[#d9d9d9] text-[18px] font-semibold justify-self-center">
          Flows / New flow
        </h2>
        <div className="text-[#d9d9d9] text-[11.5px] mr-[10px] self-center justify-self-end">
          <button
            onClick={onClick}
            className="bg-[#444444] rounded-[4px] px-[8px]"
          >
            Test flow
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;


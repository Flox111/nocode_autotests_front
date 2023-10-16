import { useCallback, useContext } from "react";
import { Edge, Node, getConnectedEdges } from "reactflow";

const runFlow = (
  nodes: Node[] | undefined,
  edges: Edge[] | undefined,
  setNodes: any
) => {
  const startNode = nodes?.find((it) => it.type == "startTriggerNode");
  
  const find = (currentNode: Node | undefined) => {
    if (currentNode != null && nodes != null) {
      setNodes((nds: Node[]) =>
        nds.map((node) => {
          if (node.id === currentNode.id) {
            node.data = {
              ...node.data,
              state: "success",
            };
            const outgoingEdges = getConnectedEdges([node], edges || []).filter(
              (edge: Edge) => {
                return edge.source == node.id;
              }
            );
            if (outgoingEdges.length > 0) {
              const nextNode = nodes.find((node: Node) => {
                return node.id == outgoingEdges[0].target;
              });
              find(nextNode);
            }
          }
          return node;
        })
      );
    }
  };
  
  find(startNode);
};

export default runFlow;

import { useCallback, useContext } from "react";
import { Edge, Node, getConnectedEdges } from "reactflow";

export const runFlow = (
  nodes: Node[] | undefined,
  edges: Edge[] | undefined,
  setNodes: any
) => {
  const startNode = nodes?.find((it) => it.type == "startNode");

  const recursiveFlow = (currentNode: Node | undefined) => {
    if (currentNode != null && nodes != null) {
      setNodes((nds: Node[]) =>
        nds.map((node) => {
          if (node.id === currentNode.id) {
            node.data = {
              ...node.data,
              state: "success",
            };
          }
          return node;
        })
      );
      const outgoingEdges = getConnectedEdges(
        [currentNode],
        edges || []
      ).filter((edge: Edge) => {
        return edge.source == currentNode.id;
      });
      if (outgoingEdges.length > 0) {
        const nextNode = nodes.find((node: Node) => {
          return node.id == outgoingEdges[0].target;
        });
        recursiveFlow(nextNode);
      }
    }
  };

  recursiveFlow(startNode);
};

export const resetFlow = (nodes: Node[] | undefined, setNodes: any) => {
  setNodes((nds: Node[]) =>
    nds.map((node) => {
      node.data = {
        ...node.data,
        state: "none",
      };
      return node;
    })
  );
};

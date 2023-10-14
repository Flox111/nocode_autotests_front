import { useCallback } from "react";
import { Connection, Edge, getConnectedEdges, useReactFlow } from "reactflow";

const useValidatorFn = () => {
  const { getNode, getEdges } = useReactFlow();

  return useCallback(
    (connection: Connection) => {
      if (connection == null) false;
      if (connection.target != null && connection.source != null) {
        const targetNode = getNode(connection.target);
        const sourceNode = getNode(connection.source);
        if (targetNode != null && sourceNode != null) {
          const targetEdges = getConnectedEdges([targetNode], getEdges());
          const edgesTargetHandle = targetEdges.filter((edge: Edge) => {
            return (
              edge.target == connection.target &&
              edge.targetHandle == connection.targetHandle
            );
          });

          const sourceEdges = getConnectedEdges([sourceNode], getEdges());
          const edgesSourceHandle = sourceEdges.filter((edge: Edge) => {
            return (
              edge.source == connection.source &&
              edge.sourceHandle == connection.sourceHandle
            );
          });

          return !edgesTargetHandle.length && !edgesSourceHandle.length;
        }
      }

      return false;
    },
    [getNode, getEdges]
  );
};

export default useValidatorFn;

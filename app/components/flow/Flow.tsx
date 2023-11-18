"use client";

import React, { useCallback, useRef, useContext } from "react";
import ReactFlow, {
  Background,
  Connection,
  Controls,
  Edge,
  addEdge,
  updateEdge
} from "reactflow";

import "reactflow/dist/base.css";
import { defaultEdgeOptions } from "./options/flow.option";
import { NodeContext } from "../context";
import { edgeTypes, nodeTypes } from "./flow.types";

export default function Flow() {
  const edgeUpdateSuccessful = useRef(true);

  const {
    nodes,
    setNodes,
    onNodesChange,
    edges,
    setEdges,
    onEdgesChange,
    nodeCount,
    setNodeCount,
  } = useContext(NodeContext);

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      edgeUpdateSuccessful.current = true;
      setEdges((els: Edge[]) => updateEdge(oldEdge, newConnection, els));
    },
    []
  );

  const onEdgeUpdateEnd = useCallback((_: any, edge: { id: string }) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds: any[]) => eds.filter((e) => e.id !== edge.id));
    }
    edgeUpdateSuccessful.current = true;
  }, []);

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds: Edge[]) => addEdge(params, eds));
    },
    [setEdges]
  );

  return (
    <div className="w-full h-[94%]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onEdgeUpdate={onEdgeUpdate}
        onEdgeUpdateStart={onEdgeUpdateStart}
        onEdgeUpdateEnd={onEdgeUpdateEnd}
        defaultEdgeOptions={defaultEdgeOptions}
        onConnect={onConnect}
      >
        <Background
          className="bg-[#2e2e2e]"
          color="#1f1f1f"
          size={2}
          gap={25}
        />
        <Controls />
      </ReactFlow>
    </div>
  );
}

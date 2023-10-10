"use client";

import React, { useCallback, useRef, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  MarkerType,
  addEdge,
  updateEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import CustomNode from "../CustomNode";

import "reactflow/dist/base.css";
import { defaultEdgeOptions } from "../../options/edge.option";

const initNodes = [
  {
    id: "1",
    type: "custom",
    data: { name: "Jane Doe", job: "CEO", emoji: "😎" },
    position: { x: 0, y: 50 },
  },
  {
    id: "2",
    type: "custom",
    data: { name: "Jane Doe", job: "CEO", emoji: "😎" },
    position: { x: -200, y: 200 },
  },
  {
    id: "3",
    type: "custom",
    data: { name: "Jane Doe", job: "CEO", emoji: "😎" },
    position: { x: 200, y: 200 },
  },
];

const initEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
  },
];

const nodeTypes = {
  custom: CustomNode,
};

export default function Flow() {
  const edgeUpdateSuccessful = useRef(true);
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);
  const [nodeCount, setNodeCount] = useState(4);

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      edgeUpdateSuccessful.current = true;
      setEdges((els) => updateEdge(oldEdge, newConnection, els));
    },
    []
  );

  const onEdgeUpdateEnd = useCallback((_: any, edge: { id: string }) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  const onAdd = () => {
    const newNode = {
      id: nodeCount.toString(),
      type: "custom",
      data: { name: "Jane Doe", job: "CEO", emoji: "😎" },
      position: { x: 0, y: 0 },
    };
    setNodeCount(nodeCount + 1);
    setNodes((nds) => nds.concat(newNode));
  };

  console.log(edges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="h-full w-full">
      <button
        onClick={onAdd}
        className="bg-orange-500 rounded-md px-5 py-1 m-4 absolute z-10 right-0"
      >
        ADD
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
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

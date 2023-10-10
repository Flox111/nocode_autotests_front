"use client";

import { useState } from "react";
import { NodeContext } from "../context";
import Flow from "../flow/Flow";
import SideBar from "../sidebar/SideBar";
import { useEdgesState, useNodesState } from "reactflow";
import { initEdges, initNodes } from "../flow/flow.const";

const Main = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);
  const [nodeCount, setNodeCount] = useState(4);

  return (
    <NodeContext.Provider
      value={{
        nodes,
        setNodes,
        onNodesChange,
        edges,
        setEdges,
        onEdgesChange,
        nodeCount,
        setNodeCount,
      }}
    >
      <div className="flex h-full w-full fixed">
        <SideBar />
        <Flow />
      </div>
    </NodeContext.Provider>
  );
};

export default Main;

import { useState, useMemo } from "react";
import { WorkflowGraphContext } from "./workflowContext";

export function WorkflowGraphProvider({ children }) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  // ➕ 新增 node
  const addNode = (node) => {
    setNodes((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        type: node.type,
        position: {
          x: 100 + prev.length * 180,
          y: 100,
        },
      },
    ]);
  };

  // 🔗 新增 edge
  const addEdge = (from, to) => {
    setEdges((prev) => [...prev, { from, to }]);
  };

  // ▶ workflow（先 mock）
  const runWorkflow = async () => {
    console.log("🚀 run workflow");
    console.log("nodes:", nodes);
    console.log("edges:", edges);

    return {
      nodes,
      edges,
    };
  };

  // ⭐ 防止 context 被重建（關鍵）
  const value = useMemo(
    () => ({
      nodes,
      edges,
      addNode,
      addEdge,
      runWorkflow,
    }),
    [nodes, edges]
  );

  return (
    <WorkflowGraphContext.Provider value={value}>
      {children}
    </WorkflowGraphContext.Provider>
  );
}
import { createContext, useContext, useState, useMemo } from "react";

const WorkflowGraphContext = createContext();

export function WorkflowGraphProvider({ children }) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const addNode = (node) => {
    setNodes((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: node.type,
        position: { x: 100, y: 100 },
      },
    ]);
  };

  const addEdge = (from, to) => {
    setEdges((prev) => [...prev, { from, to }]);
  };

  const runWorkflow = async () => {
    console.log("run workflow");
  };

  // ⭐ 關鍵修復：穩定 context value
  const value = useMemo(() => {
    return {
      nodes,
      edges,
      addNode,
      addEdge,
      runWorkflow,
    };
  }, [nodes, edges]);

  return (
    <WorkflowGraphContext.Provider value={value}>
      {children}
    </WorkflowGraphContext.Provider>
  );
}

export const useWorkflowGraph = () =>
  useContext(WorkflowGraphContext);
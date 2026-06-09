import { useState, useRef } from "react";
import { useWorkflowGraph } from "../workflow/useWorkflowGraph";
import { executeGraph } from "../workflow/executeGraph";
export default function WorkflowCanvas() {
  const { nodes, edges, addNode, addEdge, runWorkflow } =useWorkflowGraph();
  const [connectingFrom, setConnectingFrom] = useState(null);
  const canvasRef = useRef(null);
  
  // 🧠 點 node output 開始連線
  const handleStartConnect = (nodeId) => {
    setConnectingFrom(nodeId);
  };

  // 🧠 點 canvas / node 完成連線
  const handleFinishConnect = (toNodeId) => {
    if (!connectingFrom) return;

    if (connectingFrom !== toNodeId) {
      addEdge(connectingFrom, toNodeId);
    }

    setConnectingFrom(null);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* Sidebar */}
      <div style={{ width: 200, borderRight: "1px solid #ddd" }}>
        <button onClick={() => addNode({ type: "split" })}>
          ➕ Split
        </button>

        <button onClick={() => addNode({ type: "merge" })}>
          ➕ Merge
        </button>
        <button
  onClick={async () => {
  try {
    const result = await executeGraph({
      nodes,
      edges,
      initialInput: window.__TEST_FILE,
    });

    console.log("EXEC RESULT:", result);
    alert("Workflow completed!");
  } catch (err) {
    console.error(err);
    alert("Workflow failed");
  }
}}
  style={{
    marginTop: 20,
    padding: 10,
    background: "#22c55e",
    color: "white",
  }}
>
  ▶ Run Workflow
</button>

      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        style={{
          flex: 1,
          position: "relative",
          background: "#f8fafc",
        }}
      >
        {/* 🔗 SVG connections */}
        <svg
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          {edges.map((edge, i) => {
            const fromNode = nodes.find(n => n.id === edge.from);
            const toNode = nodes.find(n => n.id === edge.to);

            if (!fromNode || !toNode) return null;

            return (
              <line
                key={i}
                x1={fromNode.position.x + 120}
                y1={fromNode.position.y + 20}
                x2={toNode.position.x}
                y2={toNode.position.y + 20}
                stroke="#6366f1"
                strokeWidth="2"
              />
            );
          })}
        </svg>

        {/* 🧩 Nodes */}
        {nodes.map((node) => (
          <div
            key={node.id}
            style={{
              position: "absolute",
              left: node.position.x,
              top: node.position.y,
              padding: 12,
              background: "white",
              border: "1px solid #ddd",
              borderRadius: 10,
              minWidth: 120,
              cursor: "grab",
            }}
          >
            {/* Node label */}
            <div style={{ fontWeight: 600 }}>
              {node.type === "split" && "✂ Split"}
              {node.type === "merge" && "📎 Merge"}
            </div>

            {/* 🔌 output port */}
            <div
              onClick={() => handleStartConnect(node.id)}
              style={{
                marginTop: 8,
                padding: 4,
                background: "#e0e7ff",
                borderRadius: 6,
                cursor: "pointer",
                fontSize: 12,
                textAlign: "center",
              }}
            >
              output ➜
            </div>

            {/* 🔌 input area */}
            <div
              onClick={() => handleFinishConnect(node.id)}
              style={{
                marginTop: 6,
                padding: 4,
                background: "#f1f5f9",
                borderRadius: 6,
                cursor: "pointer",
                fontSize: 12,
                textAlign: "center",
              }}
            >
              ⬅ input
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
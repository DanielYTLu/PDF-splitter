import { useWorkflow } from "../context/WorkflowContext";

export default function WorkflowPanel() {
  const {
    steps,
    removeStep,
    clearSteps,
    runWorkflow,
    running,
    result,
  } = useWorkflow();

  return (
    <div style={styles.panel}>

      <h3 style={styles.title}>⚡ Workflow</h3>

      {steps.length === 0 && (
        <div style={styles.empty}>
          尚未加入流程
        </div>
      )}

      {steps.map((step, i) => (
        <div key={i} style={styles.step}>
          <span>{i + 1}. {step.label}</span>

          <button onClick={() => removeStep(i)}>✕</button>
        </div>
      ))}

      {steps.length > 0 && (
        <button
          onClick={() => runWorkflow({ files: [] })}
          disabled={running}
          style={{
            marginTop: 10,
            width: "100%",
            padding: 10,
            background: running ? "#999" : "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: 8,
          }}
        >
          {running ? "執行中..." : "🚀 執行 Workflow"}
        </button>
      )}

      {result && (
        <div style={{ marginTop: 10, fontSize: 12 }}>
          <div>✅ Final:</div>
          <pre>{JSON.stringify(result.final, null, 2)}</pre>

          <div style={{ marginTop: 10 }}>📊 Logs:</div>
          {result.logs.map((log, i) => (
            <div key={i} style={{ fontSize: 11 }}>
              <b>{log.step}</b>
              <div>input: {JSON.stringify(log.input)}</div>
              <div>output: {JSON.stringify(log.output)}</div>
            </div>
          ))}
        </div>
      )}

      {steps.length > 0 && (
        <button onClick={clearSteps} style={{ marginTop: 10 }}>
          清空
        </button>
      )}

    </div>
  );
}

const styles = {
  panel: { padding: 16 },
  title: { fontSize: 14, fontWeight: 800 },
  empty: { fontSize: 13, color: "#999" },
  step: {
    display: "flex",
    justifyContent: "space-between",
    padding: 8,
    background: "#f3f4f6",
    marginBottom: 6,
    borderRadius: 6,
  },
};
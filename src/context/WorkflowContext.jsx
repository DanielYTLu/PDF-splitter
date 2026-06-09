import { createContext, useContext, useState } from "react";

const WorkflowContext = createContext();

export function WorkflowProvider({ children }) {
  const [steps, setSteps] = useState([]);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);

  const addStep = (step) => {
    setSteps((prev) => [...prev, step]);
  };

  const removeStep = (index) => {
    setSteps((prev) => prev.filter((_, i) => i !== index));
  };

  const clearSteps = () => {
    setSteps([]);
    setResult(null);
  };

  // 🚀 核心執行器
  const runWorkflow = async (initialInput) => {
    setRunning(true);

    let data = initialInput;
    const logs = [];

    for (const step of steps) {
      const output = await step.run(data);

      logs.push({
        step: step.label,
        input: data,
        output,
      });

      data = output;
    }

    setResult({
      final: data,
      logs,
    });

    setRunning(false);
  };

  return (
    <WorkflowContext.Provider
      value={{
        steps,
        addStep,
        removeStep,
        clearSteps,
        runWorkflow,
        running,
        result,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
}

export function useWorkflow() {
  return useContext(WorkflowContext);
}
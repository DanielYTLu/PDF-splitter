import { createContext, useContext, useState } from "react";
import { runWorkflowV2 } from "./WorkflowEngine";

const WorkflowContext = createContext();

export function WorkflowProvider({ children }) {
  const [steps, setSteps] = useState([]);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);

  const addStep = (step) => {
    setSteps((prev) => [...prev, step]);
  };

  const clearSteps = () => setSteps([]);

  const runWorkflow = async (initialInput) => {
    setRunning(true);

    try {
      const res = await runWorkflowV2(steps, initialInput);

      setResult(res);
      return res;
    } finally {
      setRunning(false);
    }
  };

  return (
    <WorkflowContext.Provider
      value={{
        steps,
        addStep,
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

export const useWorkflow = () => useContext(WorkflowContext);
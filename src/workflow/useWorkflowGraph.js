import { useContext } from "react";
import { WorkflowGraphContext } from "./workflowContext";

export const useWorkflowGraph = () => {
  const ctx = useContext(WorkflowGraphContext);

  if (!ctx) {
    throw new Error("useWorkflowGraph must be used inside Provider");
  }

  return ctx;
};
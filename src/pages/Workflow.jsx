import { WorkflowGraphProvider } from "../workflow/WorkflowGraphProvider";
import WorkflowCanvas from "../workflow/WorkflowCanvas";

export default function Workflow() {
  return (
    <WorkflowGraphProvider>
      <WorkflowCanvas />
    </WorkflowGraphProvider>
  );
}
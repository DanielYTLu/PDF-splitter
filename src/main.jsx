import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { WorkspaceProvider } from "./context/WorkspaceContext";
import { WorkflowProvider } from "./context/WorkflowContext";

ReactDOM.createRoot(document.getElementById("root")).render(
<WorkspaceProvider>
  <WorkflowProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </WorkflowProvider>
</WorkspaceProvider>
);
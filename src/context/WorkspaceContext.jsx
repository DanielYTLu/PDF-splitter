import { createContext, useContext, useState } from "react";

const WorkspaceContext = createContext();

export function WorkspaceProvider({ children }) {
  const [files, setFiles] = useState([]);

  const addFiles = (newFiles) => {
    setFiles((prev) => [
      ...prev,
      ...(Array.isArray(newFiles) ? newFiles : [newFiles]),
    ]);
  };

  const clearFiles = () => setFiles([]);

  return (
    <WorkspaceContext.Provider
      value={{
        files,
        addFiles,
        clearFiles,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  return useContext(WorkspaceContext);
}
import { useState } from "react";
import { saveFile } from "../utils/fileDB";

export default function useResult() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const start = () => setLoading(true);

  const success = async (data, metadata = {}) => {
    setResult({
      status: "success",
      data,
    });

    // 🔥 統一資料結構
    await saveFile({
      name: metadata.name || "output.pdf",
      tool: metadata.tool || "PDF Tool",
      size: metadata.size || "Unknown",
      blob: metadata.blob || null,
    });

    setLoading(false);
  };

  const error = () => {
    setResult({ status: "error" });
    setLoading(false);
  };

  const reset = () => {
    setResult(null);
    setLoading(false);
  };

  return {
    result,
    loading,
    start,
    success,
    error,
    reset,
  };
}
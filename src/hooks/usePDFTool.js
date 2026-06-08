import { useState } from "react";
import toast from "react-hot-toast";

export default function usePDFTool() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSuccess = (message) => {
    toast.success(message);
  };

  const handleError = (err, message = "處理失敗") => {
    console.error(err);

    setError(message);
    toast.error(message);
  };

  return {
    file,
    setFile,

    loading,
    setLoading,

    error,
    setError,

    handleSuccess,
    handleError,
  };
}
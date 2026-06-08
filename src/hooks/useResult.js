import { useState } from "react";

export default function useResult() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const start = () => setLoading(true);

  const success = (data) => {
    setResult({
      status: "success",
      data,
    });
    setLoading(false);
  };

  const error = () => {
    setResult({
      status: "error",
    });
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
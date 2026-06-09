import { useState } from "react";
import usePDFTool from "../hooks/usePDFTool";
import FileUploader from "../components/FileUploader";
import Loading from "../components/Loading";
import toast from "react-hot-toast";

import { compressPDF } from "../utils/compressPDF";

export default function CompressPDF() {
  const {
    file,
    setFile,
    loading,
    setLoading,
    handleSuccess,
    handleError,
  } = usePDFTool();

  const handleCompress = async () => {
    if (!file) {
      toast.error("請選擇 PDF");
      return;
    }

    try {
      setLoading(true);

      await compressPDF(file);

      handleSuccess("壓縮完成！");
    } catch (err) {
      handleError(err, "壓縮失敗");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Title */}
      <h1>
        🗜 PDF 壓縮
      </h1>

      {loading && <Loading text="正在壓縮 PDF..." />}

      {!file && (
        <div
          style={{
            background: "white",
            padding: 20,
            borderRadius: 12,
            border: "1px solid #e5e7eb",
            marginBottom: 20,
          }}
        >
          <FileUploader
            onFile={(file) => {
              setFile(file);
              toast.success("上傳成功！");
            }}
          />
        </div>
      )}

      {file && (
        <div
          style={{
            background: "white",
            padding: 20,
            borderRadius: 12,
            border: "1px solid #e5e7eb",
          }}
        >
          <p style={{ fontWeight: 600 }}>已選擇：{file.name}</p>

          <button
            onClick={handleCompress}
            disabled={loading}
            style={{
              padding: 12,
              background: loading ? "#86efac" : "#16a34a",
              color: "white",
              border: "none",
              borderRadius: 8,
              width: "100%",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: 600,
            }}
          >
            {loading ? "處理中..." : "壓縮 PDF"}
          </button>
        </div>
      )}
    </div>
  );
}
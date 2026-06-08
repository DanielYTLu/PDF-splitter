import { useState } from "react";
import usePDFTool from "../hooks/usePDFTool";
import Layout from "../components/Layout";
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
    <Layout>
      <h1>🗜 PDF 壓縮</h1>

      {loading && (
        <Loading text="正在壓縮 PDF..." />
      )}

      {!file && (
        <FileUploader
          onFile={(file) => {
            setFile(file);
            toast.success("上傳成功！");
          }}
        />
      )}

      {file && (
        <div style={{ marginTop: 20 }}>
          <p>已選擇：{file.name}</p>

          <button
            onClick={handleCompress}
            disabled={loading}
            style={{
              padding: 12,
              background: loading
                ? "#86efac"
                : "#16a34a",
              color: "white",
              border: "none",
              borderRadius: 8,
              width: "100%",
              cursor: loading
                ? "not-allowed"
                : "pointer",
            }}
          >
            {loading
              ? "處理中..."
              : "壓縮 PDF"}
          </button>
        </div>
      )}
    </Layout>
  );
}
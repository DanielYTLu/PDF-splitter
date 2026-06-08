import { useState } from "react";
import usePDFTool from "../hooks/usePDFTool";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import Layout from "../components/Layout";
import FileUploader from "../components/FileUploader";
import PDFViewer from "../components/PDFViewer";

import { deletePages } from "../utils/deletePages";

export default function DeletePages() {
  const [selectedPages, setSelectedPages] = useState([]);

const {
  file: pdfFile,
  setFile: setPdfFile,

  loading,
  setLoading,

  error,
  setError,

  handleSuccess,
  handleError,
} = usePDFTool();

  const handleDelete = async () => {
  if (!pdfFile) {
    toast.error("請先上傳 PDF");
    return;
  }

  if (!selectedPages.length) {
    toast.error("請至少選擇要保留的頁面");
    return;
  }

  try {
    setLoading(true);

    await deletePages(pdfFile, selectedPages);

    handleSuccess("PDF 已成功刪除頁面！");
  } catch (err) {
    handleError(err, "刪除頁面失敗");
  } finally {
    setLoading(false);
  }
};

  return (
    <Layout>
      <h1>🗑️ PDF 頁面刪除</h1>
      {loading && (
  <Loading text="正在刪除頁面..." />
)}
      {error && (
        <div style={{ color: "red" }}>
          {error}
        </div>
      )}

      {!pdfFile && (
        <FileUploader
  onFile={(file) => {
    setPdfFile(file);
    toast.success("上傳成功！");
  }}
/>
      )}

      {pdfFile && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "3fr 1fr",
            gap: 20,
          }}
        >
          {/* 左側 PDF 預覽 */}
          <div
            style={{
              background: "white",
              padding: 16,
              borderRadius: 12,
            }}
          >
            <PDFViewer
              file={pdfFile}
              selectedPages={selectedPages}
              setSelectedPages={setSelectedPages}
              setError={setError}
            />
          </div>

          {/* 右側操作 */}
          <div
            style={{
              background: "white",
              padding: 16,
              borderRadius: 12,
            }}
          >
            <h3>操作面板</h3>

            <p>
              保留頁數：{selectedPages.length}
            </p>

            <button
              onClick={handleDelete}
              disabled={loading}
              style={{
                width: "100%",
                padding: 12,
                background: loading
                  ? "#fca5a5"
                  : "#dc2626",
                color: "white",
                border: "none",
                borderRadius: 8,
              }}
            >
             {loading
                ? "處理中..."
                : "🗑️ 刪除未選取頁面"}
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
import { useState } from "react";

import Layout from "../components/Layout";
import FileUploader from "../components/FileUploader";
import PDFViewer from "../components/PDFViewer";

import { deletePages } from "../utils/deletePages";

export default function DeletePages() {
  const [pdfFile, setPdfFile] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    if (!pdfFile) return;

    if (!selectedPages.length) {
      alert("請至少選擇要保留的頁面");
      return;
    }

    await deletePages(pdfFile, selectedPages);
  };

  return (
    <Layout>
      <h1>🗑️ PDF 頁面刪除</h1>

      {error && (
        <div style={{ color: "red" }}>
          {error}
        </div>
      )}

      {!pdfFile && (
        <FileUploader setFile={setPdfFile} />
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
              style={{
                width: "100%",
                padding: 12,
                background: "#dc2626",
                color: "white",
                border: "none",
                borderRadius: 8,
              }}
            >
              🗑️ 刪除未選取頁面
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
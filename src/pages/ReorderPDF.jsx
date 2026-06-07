import { useState } from "react";

import Layout from "../components/Layout";
import FileUploader from "../components/FileUploader";
import PDFViewer from "../components/PDFViewer";

import { reorderPages } from "../utils/reorderPages";
import toast from "react-hot-toast";
import Loading from "../components/Loading";

export default function ReorderPDF() {
  const [loading, setLoading] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]);
  const [error, setError] = useState(null);

  const handleReorder = async () => {
    if (!pdfFile) {
      toast.error("請先上傳 PDF");
      return;
    }

    if (!selectedPages.length) {
      toast.error("請至少選擇頁面");
      return;
    }

    try {
      setLoading(true);

      await reorderPages(pdfFile, selectedPages);

      toast.success("重新排序完成！");
    } catch (err) {
      console.error(err);
      toast.error("處理失敗");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1>🔀 PDF 頁面重新排序</h1>

      {loading && <Loading text="正在重新排序 PDF..." />}

      {error && (
        <div style={{ color: "red" }}>{error}</div>
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
          {/* LEFT */}
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

          {/* RIGHT */}
          <div
            style={{
              background: "white",
              padding: 16,
              borderRadius: 12,
            }}
          >
            <h3>排序控制</h3>

            <p>
              已選順序：{selectedPages.join(" → ")}
            </p>

            <button
              onClick={handleReorder}
              disabled={loading}
              style={{
                width: "100%",
                padding: 12,
                background: loading ? "#a78bfa" : "#7c3aed",
                color: "white",
                border: "none",
                borderRadius: 8,
                cursor: loading
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              {loading ? "處理中..." : "🔀 重新輸出 PDF"}
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
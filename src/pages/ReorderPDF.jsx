import { useState } from "react";
import usePDFTool from "../hooks/usePDFTool";
import FileUploader from "../components/FileUploader";
import PDFViewer from "../components/PDFViewer";
import { reorderPages } from "../utils/reorderPages";
import toast from "react-hot-toast";
import Loading from "../components/Loading";

export default function ReorderPDF() {
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

      handleSuccess("重新排序完成！");
    } catch (err) {
      console.error(err);
      handleError(err, "處理失敗");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Title */}
      <h1>
        🔀 PDF 頁面重新排序
      </h1>

      {loading && <Loading text="正在重新排序 PDF..." />}

      {error && (
        <div style={{ color: "red", marginBottom: 10 }}>
          {error}
        </div>
      )}

      {!pdfFile && (
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
              setPdfFile(file);
              toast.success("上傳成功！");
            }}
          />
        </div>
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
              border: "1px solid #e5e7eb",
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
              border: "1px solid #e5e7eb",
            }}
          >
            <h3 style={{ marginTop: 0 }}>排序控制</h3>

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
                cursor: loading ? "not-allowed" : "pointer",
                fontWeight: 600,
              }}
            >
              {loading ? "處理中..." : "🔀 重新輸出 PDF"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
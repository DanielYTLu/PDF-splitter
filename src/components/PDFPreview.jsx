import { splitPDF } from "../utils/pdfSplitter";

export default function PDFPreview({
  pdfFile,
  selectedPages,
  setSelectedPages,
  setError,
  onSuccess,
}) {
  const handleSplit = async () => {
    try {
      await splitPDF(pdfFile, selectedPages);

      // callback 給 parent（SplitPDF）
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error(err);

      if (setError) {
        setError("PDF 分割失敗");
      }
    }
  };

  return (
    <div>
      <h3>操作面板</h3>

      <p>已選擇：{selectedPages.length} 頁</p>

      <button
        onClick={handleSplit}
        style={{
          padding: 12,
          width: "100%",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        ✂ 開始分割 PDF
      </button>

      <div style={{ marginTop: 10, fontSize: 12, color: "#888" }}>
        提示：點選左側頁面來選擇
      </div>
    </div>
  );
}
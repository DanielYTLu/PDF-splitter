import { splitPDF } from "../utils/pdfSplitter";

function PDFPreview({ pdfFile, selectedPages }) {
  return (
    <div>
      <h2>操作面板</h2>

      <p>已選擇：{selectedPages.length} 頁</p>

      <button
        onClick={() => splitPDF(pdfFile, selectedPages)}
        style={{
          width: "100%",
          padding: 12,
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

export default PDFPreview;
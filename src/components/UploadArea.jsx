function UploadArea({ setPdfFile }) {
  return (
    <label
      style={{
        border: "2px dashed #aaa",
        padding: 60,
        borderRadius: 12,
        cursor: "pointer",
        textAlign: "center",
        background: "white",
        width: 400,
        transition: "0.2s",
      }}
    >
      <input
        type="file"
        accept="application/pdf"
        hidden
        onChange={(e) => setPdfFile(e.target.files?.[0])}
      />

      <div style={{ fontSize: 18 }}>📤 拖曳或點擊上傳 PDF</div>
      <div style={{ fontSize: 12, color: "#888", marginTop: 8 }}>
        支援 PDF 檔案
      </div>
    </label>
  );
}

export default UploadArea;
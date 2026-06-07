import { useRef, useState } from "react";

export default function Dropzone({ onFile }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file) => {
    if (!file) return;
    onFile(file);
  };

  return (
    <div
      onClick={() => inputRef.current.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFile(e.dataTransfer.files[0]);
      }}
      style={{
        border: "2px dashed #4f46e5",
        padding: 60,
        borderRadius: 12,
        textAlign: "center",
        cursor: "pointer",
        background: isDragging ? "#eef2ff" : "white",
        transition: "0.2s",
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        hidden
        onChange={(e) =>
          handleFile(e.target.files?.[0])
        }
      />

      <h3>📄 拖曳 PDF 到這裡</h3>
      <p style={{ color: "#666" }}>
        或點擊選擇檔案
      </p>
    </div>
  );
}
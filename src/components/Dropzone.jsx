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
        border: isDragging
          ? "2px solid #2563eb"
          : "2px dashed #cbd5e1",
        padding: 40,
        borderRadius: 14,
        textAlign: "center",
        cursor: "pointer",
        background: isDragging
          ? "#eff6ff"
          : "#ffffff",
        transition: "0.2s",
        boxShadow: isDragging
          ? "0 8px 25px rgba(37,99,235,0.15)"
          : "none",
        transform: isDragging ? "scale(1.01)" : "scale(1)"
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

      {/* ICON */}
      <div style={{ fontSize: 28, marginBottom: 8 }}>
        
      </div>

      {/* TITLE */}
      <div
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: "#111827",
        }}
      >
        拖曳 PDF 到這裡
      </div>

      {/* SUBTEXT */}
      <div
        style={{
          fontSize: 12,
          color: "#6b7280",
          marginTop: 6,
        }}
      >
        或點擊選擇檔案（支援 PDF）
      </div>
    </div>
  );
}
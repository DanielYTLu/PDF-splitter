import { useRef, useState } from "react";

export default function Dropzone({
  onFile,
  multiple = false,
  accept = "application/pdf",
}) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleFile = (file) => {
    if (!file) return;
    onFile(file);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);

        if (multiple) {
          handleFile(Array.from(e.dataTransfer.files));
        } else {
          handleFile(e.dataTransfer.files[0]);
        }
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{
        ...styles.box,
        ...(isDragging ? styles.dragging : {}),
        ...(isHover && !isDragging ? styles.hover : {}),
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        hidden
        onChange={(e) => {
          if (multiple) {
            handleFile(Array.from(e.target.files || []));
          } else {
            handleFile(e.target.files?.[0]);
          }
        }}
      />

      <div style={styles.icon}>📄</div>

      <div style={styles.title}>
        {isDragging ? "放開以上傳檔案" : "拖曳檔案到此處"}
      </div>

      <div style={styles.subtitle}>
        或點擊選擇檔案（支援 PDF 上傳）
      </div>
    </div>
  );
}

/* =========================
🎨 Stripe / SaaS STYLE
========================= */
const styles = {
  box: {
    padding: 44,
    borderRadius: 16,
    textAlign: "center",
    cursor: "pointer",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
    position: "relative",
  },

  hover: {
    transform: "translateY(-2px)",
    borderColor: "#93c5fd",
    boxShadow: "0 10px 30px rgba(59,130,246,0.12)",
  },

  dragging: {
    border: "1px solid #2563eb",
    background: "linear-gradient(135deg, #eff6ff, #ffffff)",
    boxShadow: "0 15px 40px rgba(37,99,235,0.18)",
    transform: "scale(1.02)",
  },

  icon: {
    fontSize: 34,
    marginBottom: 10,
    filter: "grayscale(0.2)",
  },

  title: {
    fontSize: 16,
    fontWeight: 600,
    color: "#0f172a",
    marginBottom: 6,
    letterSpacing: "-0.01em",
  },

  subtitle: {
    fontSize: 12,
    color: "#64748b",
  },
};
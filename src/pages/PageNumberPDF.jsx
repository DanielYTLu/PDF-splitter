import { useState } from "react";
import FileUploader from "../components/FileUploader";
import Loading from "../components/Loading";
import { pageNumberPDF } from "../utils/pageNumberPDF";
import toast from "react-hot-toast";

export default function PageNumberPDF() {
  const [file, setFile] = useState(null);
  const [position, setPosition] = useState("bottomRight");
  const [size, setSize] = useState(12);
  const [startAt, setStartAt] = useState(1);
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePageNumber = async () => {
    if (!file) {
      toast.error("請選擇 PDF");
      return;
    }

    try {
      setLoading(true);

      await pageNumberPDF(file, { position, size, startAt, prefix, suffix });

      toast.success("頁碼新增完成！");
    } catch (err) {
      console.error(err);
      toast.error("處理失敗");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Title */}
      <h1 >
        📄 PDF 頁碼
      </h1>

      {loading && <Loading text="正在加入頁碼..." />}

      {!file && (
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
              setFile(file);
              toast.success("上傳成功！");
            }}
          />
        </div>
      )}

      {file && (
        <div
          style={{
            background: "white",
            padding: 20,
            borderRadius: 12,
            border: "1px solid #e5e7eb",
          }}
        >
          <p style={{ fontWeight: 600, marginBottom: 16 }}>
            📄 {file.name}
          </p>

          <h3 style={{ marginBottom: 12 }}>頁碼位置與格式</h3>

          <div style={{ display: "grid", gap: 10, marginBottom: 16 }}>
            {['bottomLeft','bottomCenter','bottomRight','topLeft','topCenter','topRight'].map((item) => (
              <label key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input type="radio" value={item} checked={position === item} onChange={(e) => setPosition(e.target.value)} />
                {item.replace('bottom','下').replace('top','上').replace('Left','左').replace('Center','中').replace('Right','右')}
              </label>
            ))}
          </div>

          <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>字體大小：{size}px</label>
          <input type="range" min="8" max="28" value={size} onChange={(e) => setSize(Number(e.target.value))} style={{ width: "100%", marginBottom: 12 }} />

          <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>起始頁碼</label>
          <input type="number" min="1" value={startAt} onChange={(e) => setStartAt(Number(e.target.value) || 1)} style={inputStyle} />

          <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>前綴</label>
          <input value={prefix} onChange={(e) => setPrefix(e.target.value)} placeholder="例：第" style={inputStyle} />

          <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>後綴</label>
          <input value={suffix} onChange={(e) => setSuffix(e.target.value)} placeholder="例：頁" style={inputStyle} />

          <div style={{ marginBottom: 16, padding: 12, borderRadius: 10, background: "#f8fafc", border: "1px solid #e5e7eb" }}>
            <p style={{ margin: "0 0 6px", fontWeight: 600 }}>預覽</p>
            <div style={{ fontSize: size, color: "#374151" }}>{prefix}{startAt}{suffix}</div>
          </div>

          <button
            onClick={handlePageNumber}
            disabled={loading}
            style={{
              width: "100%",
              padding: 12,
              border: "none",
              borderRadius: 10,
              background: loading ? "#93c5fd" : "#2563eb",
              color: "white",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "處理中..." : "📄 新增頁碼"}
          </button>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: 10,
  borderRadius: 8,
  border: "1px solid #ddd",
  marginBottom: 10,
};
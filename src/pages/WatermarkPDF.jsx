import { useState } from "react";
import FileUploader from "../components/FileUploader";
import Loading from "../components/Loading";
import { watermarkPDF } from "../utils/watermarkPDF";
import toast from "react-hot-toast";

export default function WatermarkPDF() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("CONFIDENTIAL");
  const [size, setSize] = useState(52);
  const [opacity, setOpacity] = useState(0.35);
  const [position, setPosition] = useState("center");
  const [rotation, setRotation] = useState(-35);
  const [loading, setLoading] = useState(false);

  const handleWatermark = async () => {
    if (!file) return toast.error("請選擇 PDF");
    if (!text) return toast.error("請輸入浮水印");

    try {
      setLoading(true);
      await watermarkPDF(file, text, {
        size,
        opacity,
        position,
        rotation,
      });
      toast.success("浮水印完成！");
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
        💧 PDF 浮水印
      </h1>

      {/* Loading */}
      {loading && <Loading text="正在加入浮水印..." />}

      {/* Upload Card */}
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

      {/* File + Input Card */}
      {file && (
        <div
          style={{
            background: "white",
            padding: 20,
            borderRadius: 12,
            border: "1px solid #e5e7eb",
            marginBottom: 20,
          }}
        >
          {/* File Name */}
          <p style={{ fontWeight: 600 }}>{file.name}</p>

          <label style={{ display: "block", fontWeight: 600, marginTop: 10 }}>浮水印文字</label>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="輸入浮水印文字"
            style={{
              width: "100%",
              padding: 12,
              border: "1px solid #ddd",
              borderRadius: 8,
              marginTop: 6,
            }}
          />

          <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
            <label style={{ fontWeight: 600 }}>字體大小：{size}px</label>
            <input type="range" min="18" max="120" value={size} onChange={(e) => setSize(Number(e.target.value))} />

            <label style={{ fontWeight: 600 }}>透明度：{opacity.toFixed(2)}</label>
            <input type="range" min="0.05" max="1" step="0.01" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} />

            <label style={{ fontWeight: 600 }}>角度：{rotation}°</label>
            <input type="range" min="-90" max="90" value={rotation} onChange={(e) => setRotation(Number(e.target.value))} />

            <label style={{ fontWeight: 600 }}>位置</label>
            <select value={position} onChange={(e) => setPosition(e.target.value)} style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}>
              <option value="center">中央</option>
              <option value="topLeft">左上</option>
              <option value="topRight">右上</option>
              <option value="bottomLeft">左下</option>
              <option value="bottomRight">右下</option>
            </select>
          </div>

          <div style={{ marginTop: 16, padding: 14, borderRadius: 12, background: "linear-gradient(135deg, #f8fafc, #eef2ff)", border: "1px dashed #c7d2fe" }}>
            <p style={{ margin: "0 0 8px", fontWeight: 600 }}>預覽縮圖（僅供預覽）</p>
            <div style={{ minHeight: 110, borderRadius: 12, background: "linear-gradient(135deg, #ffffff, #e5eefb)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", border: "1px solid #dbe4ff" }}>
              <span
                style={{
                  fontSize: size * 0.55,
                  color: "rgba(107, 114, 128, 0.75)",
                  transform: `rotate(${rotation}deg)`,
                  opacity,
                  letterSpacing: 2,
                  fontWeight: 700,
                  textTransform: "uppercase",
                }}
              >
                {text || "PREVIEW"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Action Button */}
      {file && (
        <button
          onClick={handleWatermark}
          disabled={loading}
          style={{
            padding: "12px 18px",
            background: loading ? "#93c5fd" : "#2563eb",
            color: "white",
            border: "none",
            borderRadius: 10,
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "處理中..." : "💧 加入浮水印"}
        </button>
      )}
    </div>
  );
}
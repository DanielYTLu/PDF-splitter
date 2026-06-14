import { useState } from "react";
import FileUploader from "../components/FileUploader";
import Loading from "../components/Loading";
import { imageWatermarkPDF } from "../utils/imageWatermarkPDF";
import toast from "react-hot-toast";

export default function ImageWatermarkPDF() {
  const [pdfFile, setPdfFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [opacity, setOpacity] = useState(0.35);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState("center");
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleProcess = async () => {
    if (!pdfFile) return toast.error("請上傳 PDF");
    if (!imageFile) return toast.error("請上傳圖片");

    try {
      setLoading(true);

      await imageWatermarkPDF(pdfFile, imageFile, {
        opacity,
        scale,
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
        🖼️ Logo 浮水印
      </h1>

      {loading && <Loading text="正在加入 Logo..." />}

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
          <h3 style={{ marginBottom: 10 }}>上傳 PDF</h3>

          <FileUploader
            onFile={(file) => {
              setPdfFile(file);
              toast.success("PDF 上傳成功");
            }}
          />
        </div>
      )}

      {pdfFile && !imageFile && (
        <div
          style={{
            background: "white",
            padding: 20,
            borderRadius: 12,
            border: "1px solid #e5e7eb",
            marginBottom: 20,
          }}
        >
          <h3 style={{ marginBottom: 10 }}>上傳 Logo</h3>

          <FileUploader
            accept="image/*"
            onFile={(file) => {
              setImageFile(file);
              toast.success("圖片上傳成功");
            }}
          />
        </div>
      )}

      {pdfFile && imageFile && (
        <div
          style={{
            background: "white",
            padding: 20,
            borderRadius: 12,
            border: "1px solid #e5e7eb",
          }}
        >
          <div style={{ display: "grid", gap: 12 }}>
            <label style={{ fontWeight: 600 }}>透明度：{opacity.toFixed(2)}</label>
            <input type="range" min="0.05" max="1" step="0.01" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} />

            <label style={{ fontWeight: 600 }}>縮放：{scale.toFixed(2)}x</label>
            <input type="range" min="0.2" max="2.5" step="0.05" value={scale} onChange={(e) => setScale(Number(e.target.value))} />

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
            <div style={{ minHeight: 120, borderRadius: 12, background: "white", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", border: "1px solid #dbe4ff" }}>
              <img
                src={URL.createObjectURL(imageFile)}
                alt="logo preview"
                style={{ maxWidth: 160, maxHeight: 120, opacity, transform: `rotate(${rotation}deg) scale(${scale})`, objectFit: "contain" }}
              />
            </div>
          </div>

          <button
            onClick={handleProcess}
            style={{
              width: "100%",
              marginTop: 20,
              padding: 12,
              border: "none",
              borderRadius: 8,
              background: "#2563eb",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            🖼️ 加入 Logo
          </button>
        </div>
      )}
    </div>
  );
}
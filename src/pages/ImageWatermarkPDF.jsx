import { useState } from "react";
import FileUploader from "../components/FileUploader";
import Loading from "../components/Loading";
import { imageWatermarkPDF } from "../utils/imageWatermarkPDF";
import toast from "react-hot-toast";

export default function ImageWatermarkPDF() {
  const [pdfFile, setPdfFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [opacity, setOpacity] = useState(0.3);
  const [loading, setLoading] = useState(false);

  const handleProcess = async () => {
    if (!pdfFile) return toast.error("請上傳 PDF");
    if (!imageFile) return toast.error("請上傳圖片");

    try {
      setLoading(true);

      await imageWatermarkPDF(pdfFile, imageFile, opacity);

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
          <label style={{ fontWeight: 600 }}>
            透明度：{opacity}
          </label>

          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            style={{ width: "100%", marginTop: 10 }}
          />

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
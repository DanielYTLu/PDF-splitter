import { useState } from "react";
import FileUploader from "../components/FileUploader";
import Loading from "../components/Loading";
import { watermarkPDF } from "../utils/watermarkPDF";
import toast from "react-hot-toast";

export default function WatermarkPDF() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleWatermark = async () => {
    if (!file) return toast.error("請選擇 PDF");
    if (!text) return toast.error("請輸入浮水印");

    try {
      setLoading(true);
      await watermarkPDF(file, text);
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

          {/* Input */}
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="輸入浮水印文字"
            style={{
              width: "100%",
              padding: 12,
              border: "1px solid #ddd",
              borderRadius: 8,
              marginTop: 10,
            }}
          />
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
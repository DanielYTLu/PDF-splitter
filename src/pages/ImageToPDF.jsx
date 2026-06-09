import { useState } from "react";
import FileUploader from "../components/FileUploader";
import Loading from "../components/Loading";
import { imageToPDF } from "../utils/imageToPDF";
import toast from "react-hot-toast";

export default function ImageToPDF() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (!files.length) {
      toast.error("請選擇圖片");
      return;
    }

    try {
      setLoading(true);

      await imageToPDF(files);

      toast.success("轉換完成！");
    } catch (err) {
      console.error(err);
      toast.error("轉換失敗");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Title */}
      <h1 >
        🖼️ 圖片轉 PDF
      </h1>

      {loading && <Loading text="正在轉換 PDF..." />}

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
          multiple
          accept="image/png,image/jpeg"
          onFile={(newFiles) =>
            setFiles(Array.isArray(newFiles) ? newFiles : [newFiles])
          }
        />
      </div>

      {files.length > 0 && (
        <div
          style={{
            background: "white",
            padding: 20,
            borderRadius: 12,
            border: "1px solid #e5e7eb",
          }}
        >
          <p style={{ fontWeight: 600 }}>已選擇 {files.length} 張圖片</p>

          <button
            onClick={handleConvert}
            disabled={loading || !files.length}
            style={{
              marginTop: 20,
              padding: "12px 18px",
              borderRadius: 10,
              border: "none",
              background: loading ? "#a5b4fc" : "#4f46e5",
              color: "white",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              width: "100%",
            }}
          >
            {loading ? "轉換中..." : "📄 轉換 PDF"}
          </button>
        </div>
      )}
    </div>
  );
}
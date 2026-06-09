import { useState } from "react";
import FileUploader from "../components/FileUploader";
import Loading from "../components/Loading";
import { pageNumberPDF } from "../utils/pageNumberPDF";
import toast from "react-hot-toast";

export default function PageNumberPDF() {
  const [file, setFile] = useState(null);
  const [position, setPosition] = useState("right");
  const [loading, setLoading] = useState(false);

  const handlePageNumber = async () => {
    if (!file) {
      toast.error("請選擇 PDF");
      return;
    }

    try {
      setLoading(true);

      await pageNumberPDF(file, position);

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

          <h3 style={{ marginBottom: 12 }}>頁碼位置</h3>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginBottom: 20,
            }}
          >
            <label>
              <input
                type="radio"
                value="left"
                checked={position === "left"}
                onChange={(e) => setPosition(e.target.value)}
              />{" "}
              左下角
            </label>

            <label>
              <input
                type="radio"
                value="center"
                checked={position === "center"}
                onChange={(e) => setPosition(e.target.value)}
              />{" "}
              中下方
            </label>

            <label>
              <input
                type="radio"
                value="right"
                checked={position === "right"}
                onChange={(e) => setPosition(e.target.value)}
              />{" "}
              右下角
            </label>
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
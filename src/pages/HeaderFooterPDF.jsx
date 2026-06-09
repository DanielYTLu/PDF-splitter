import { useState } from "react";
import FileUploader from "../components/FileUploader";
import Loading from "../components/Loading";
import { headerFooterPDF } from "../utils/headerFooterPDF";
import toast from "react-hot-toast";

export default function HeaderFooterPDF() {
  const [file, setFile] = useState(null);
  const [header, setHeader] = useState("");
  const [footer, setFooter] = useState("");
  const [loading, setLoading] = useState(false);

  const handleProcess = async () => {
    if (!file) return toast.error("請選擇 PDF");

    if (!header && !footer) {
      return toast.error("請輸入 Header 或 Footer");
    }

    try {
      setLoading(true);

      await headerFooterPDF(file, header, footer);

      toast.success("完成！");
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
        📄 Header / Footer
      </h1>

      {loading && <Loading text="處理中..." />}

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
            onFile={(file) => setFile(file)}
          />
        </div>
      )}

      {file && (
        <div
          style={{
            marginTop: 20,
            background: "white",
            padding: 20,
            borderRadius: 12,
            border: "1px solid #e5e7eb",
          }}
        >
          <input
            placeholder="Header 內容"
            value={header}
            onChange={(e) => setHeader(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Footer 內容"
            value={footer}
            onChange={(e) => setFooter(e.target.value)}
            style={inputStyle}
          />

          <button
            onClick={handleProcess}
            style={{
              width: "100%",
              padding: 12,
              border: "none",
              borderRadius: 8,
              background: "#2563eb",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            新增 Header/Footer
          </button>
        </div>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: 12,
  marginBottom: 12,
  border: "1px solid #ddd",
  borderRadius: 8,
};
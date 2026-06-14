import { useState } from "react";
import FileUploader from "../components/FileUploader";
import Loading from "../components/Loading";
import { headerFooterPDF } from "../utils/headerFooterPDF";
import toast from "react-hot-toast";

export default function HeaderFooterPDF() {
  const [file, setFile] = useState(null);
  const [header, setHeader] = useState("My Company");
  const [footer, setFooter] = useState("Page 1");
  const [headerSize, setHeaderSize] = useState(12);
  const [footerSize, setFooterSize] = useState(12);
  const [opacity, setOpacity] = useState(1);
  const [align, setAlign] = useState("left");
  const [loading, setLoading] = useState(false);

  const handleProcess = async () => {
    if (!file) return toast.error("請選擇 PDF");

    if (!header && !footer) {
      return toast.error("請輸入 Header 或 Footer");
    }

    try {
      setLoading(true);

      await headerFooterPDF(file, header, footer, { headerSize, footerSize, opacity, align });

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
          <input placeholder="Header 內容" value={header} onChange={(e) => setHeader(e.target.value)} style={inputStyle} />
          <input placeholder="Footer 內容" value={footer} onChange={(e) => setFooter(e.target.value)} style={inputStyle} />

          <label style={{ fontWeight: 600 }}>Header 大小：{headerSize}px</label>
          <input type="range" min="8" max="28" value={headerSize} onChange={(e) => setHeaderSize(Number(e.target.value))} style={{ width: "100%", marginBottom: 10 }} />

          <label style={{ fontWeight: 600 }}>Footer 大小：{footerSize}px</label>
          <input type="range" min="8" max="28" value={footerSize} onChange={(e) => setFooterSize(Number(e.target.value))} style={{ width: "100%", marginBottom: 10 }} />

          <label style={{ fontWeight: 600 }}>透明度：{opacity.toFixed(2)}</label>
          <input type="range" min="0.2" max="1" step="0.01" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} style={{ width: "100%", marginBottom: 10 }} />

          <label style={{ fontWeight: 600 }}>對齊方式</label>
          <select value={align} onChange={(e) => setAlign(e.target.value)} style={inputStyle}>
            <option value="left">左對齊</option>
            <option value="center">置中</option>
            <option value="right">右對齊</option>
          </select>

          <div style={{ marginBottom: 16, padding: 12, borderRadius: 10, background: "#f8fafc", border: "1px solid #e5e7eb" }}>
            <p style={{ margin: "0 0 6px", fontWeight: 600 }}>預覽</p>
            <div style={{ fontSize: headerSize, opacity, color: "#374151" }}>{header || "Header"}</div>
            <div style={{ fontSize: footerSize, opacity, color: "#374151", marginTop: 4 }}>{footer || "Footer"}</div>
          </div>

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
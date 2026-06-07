import { useState } from "react";
import UploadArea from "./components/UploadArea";
import PDFViewer from "./components/PDFViewer";
import PDFPreview from "./components/PDFPreview";

export default function App() {
  const [pdfFile, setPdfFile] = useState(null);
  const [selectedPages, setSelectedPages] = useState([]);
  const [error, setError] = useState(null);

  return (
    <div style={{ fontFamily: "Arial", background: "#f5f6f8", minHeight: "100vh" }}>
      
      {/* Header */}
      <div style={{ padding: 30, textAlign: "center" }}>
        <h1 style={{ fontSize: 32 }}>📄 PDF 分割工具</h1>
        <p style={{ color: "#666" }}>快速、安全、純前端 PDF 工具</p>
      </div>

      {/* Upload Area */}
      {!pdfFile && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <UploadArea setPdfFile={setPdfFile} />
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{ color: "red", textAlign: "center" }}>
          {error}
        </div>
      )}

      {/* Main Work Area */}
      {pdfFile && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: 20,
            padding: 20,
          }}
        >
          {/* Left - PDF Viewer */}
          <div
            style={{
              background: "white",
              padding: 10,
              borderRadius: 12,
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <PDFViewer
              file={pdfFile}
              selectedPages={selectedPages}
              setSelectedPages={setSelectedPages}
              setError={setError}
            />
          </div>

          {/* Right - Control Panel */}
          <div
            style={{
              background: "white",
              padding: 20,
              borderRadius: 12,
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
              height: "fit-content",
              position: "sticky",
              top: 20,
            }}
          >
            <PDFPreview
              pdfFile={pdfFile}
              selectedPages={selectedPages}
            />
          </div>
        </div>
      )}
    </div>
  );
}
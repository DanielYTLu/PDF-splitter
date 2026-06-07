import { useState } from "react";

import Layout from "../components/Layout";
import FileUploader from "../components/FileUploader";

import { compressPDF } from "../utils/compressPDF";

export default function CompressPDF() {
  const [file, setFile] = useState(null);

  const handleCompress = async () => {
    if (!file) return;

    await compressPDF(file);
  };

  return (
    <Layout>
      <h1>🗜 PDF 壓縮</h1>

      {!file && (
       <FileUploader
  onFile={setFile}
/>
      )}

      {file && (
        <div style={{ marginTop: 20 }}>
          <p>已選擇：{file.name}</p>

          <button
            onClick={handleCompress}
            style={{
              padding: 12,
              background: "#16a34a",
              color: "white",
              border: "none",
              borderRadius: 8,
              width: "100%",
            }}
          >
            壓縮 PDF
          </button>
        </div>
      )}
    </Layout>
  );
}
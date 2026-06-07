import { useState } from "react";

import Layout from "../components/Layout";
import FileUploader from "../components/FileUploader";

import { encryptPDF } from "../utils/encryptPDF";

export default function EncryptPDF() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");

  const handleEncrypt = async () => {
    console.log("FILE:", file);
    if (!file) return;

    await encryptPDF(file, password);
  };

  return (
    <Layout>
      <h1>🔒 PDF 加密</h1>

      {!file && (
        <FileUploader
  onFile={setFile}
/>
      )}

      {file && (
        <div style={{ marginTop: 20 }}>
          <p>{file.name}</p>

          <input
            type="password"
            placeholder="輸入密碼（目前僅示意）"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={{
              width: "100%",
              padding: 10,
              marginTop: 10,
            }}
          />

          <button
            onClick={handleEncrypt}
            style={{
              marginTop: 10,
              padding: 12,
              width: "100%",
              background: "#dc2626",
              color: "white",
              border: "none",
              borderRadius: 8,
            }}
          >
            加密 PDF
          </button>
        </div>
      )}
    </Layout>
  );
}
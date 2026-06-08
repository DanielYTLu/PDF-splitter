import { useState } from "react";
import usePDFTool from "../hooks/usePDFTool";
import Layout from "../components/Layout";
import FileUploader from "../components/FileUploader";
import Loading from "../components/Loading";
import toast from "react-hot-toast";

import { encryptPDF } from "../utils/encryptPDF";

export default function EncryptPDF() {
  const {
    file,
    setFile,
    loading,
    setLoading,
    handleSuccess,
    handleError,
  } = usePDFTool();

  const [password, setPassword] = useState("");

  const handleEncrypt = async () => {
    if (!file) {
      toast.error("請選擇 PDF");
      return;
    }

    if (!password) {
      toast.error("請輸入密碼");
      return;
    }

    try {
      setLoading(true);

      await encryptPDF(file, password);

      handleSuccess("加密完成！");
    } catch (err) {
      handleError(err, "加密失敗");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h1>🔒 PDF 加密</h1>

      {loading && (
        <Loading text="正在加密 PDF..." />
      )}

      {!file && (
        <FileUploader
          onFile={(file) => {
            setFile(file);
            toast.success("上傳成功！");
          }}
        />
      )}

      {file && (
        <div style={{ marginTop: 20 }}>
          <p>{file.name}</p>

          <input
            type="password"
            placeholder="輸入密碼"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={{
              width: "100%",
              padding: 10,
              marginTop: 10,
              borderRadius: 6,
              border: "1px solid #ddd",
            }}
          />

          <button
            onClick={handleEncrypt}
            disabled={loading}
            style={{
              marginTop: 10,
              padding: 12,
              width: "100%",
              background: loading
                ? "#fca5a5"
                : "#dc2626",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: loading
                ? "not-allowed"
                : "pointer",
            }}
          >
            {loading
              ? "處理中..."
              : "加密 PDF"}
          </button>
        </div>
      )}
    </Layout>
  );
}
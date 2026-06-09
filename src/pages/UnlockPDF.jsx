import { useState } from "react";
import Card from "../components/ui/Card";
import FileUploader from "../components/FileUploader";
import { unlockPDF } from "../utils/unlockPDF";
import toast from "react-hot-toast";

export default function UnlockPDF() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUnlock = async () => {
    if (!file) return toast.error("請上傳 PDF");
    if (!password) return toast.error("請輸入密碼");

    try {
      setLoading(true);
      await unlockPDF(file, password);
      toast.success("解鎖成功！");
    } catch (err) {
      console.error(err);
      toast.error("解鎖失敗（密碼錯誤或檔案受保護）");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Title */}
      <h1>🔓 PDF 解鎖 </h1>

      {/* Upload */}
      <Card>
        <FileUploader
          onFile={(file) => {
            setFile(file);
            toast.success("上傳成功！");
          }}
        />
      </Card>

      {/* Password + Action */}
      {file && (
        <Card>
          <input
            type="password"
            placeholder="輸入 PDF 密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              border: "1px solid #ddd",
              marginBottom: 12,
            }}
          />

          <button
            onClick={handleUnlock}
            disabled={loading}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              border: "none",
              background: loading ? "#a5b4fc" : "#4f46e5",
              color: "white",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "處理中..." : "🔓 解鎖 PDF"}
          </button>
        </Card>
      )}
    </div>
  );
}
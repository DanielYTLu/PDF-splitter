import { useState } from "react";

import ToolLayout from "../components/ui/ToolLayout";
import Card from "../components/ui/Card";
import Dropzone from "../components/Dropzone";
import ResultBox from "../components/ui/ResultBox";
import LoadingOverlay from "../components/LoadingOverlay";

import { smartCleanPDF } from "../utils/smartCleanPDF";
import { downloadBlob } from "../utils/downloadFile";

import toast from "react-hot-toast";

export default function SmartCleanPDF() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleRun = async () => {
    if (!file) return toast.error("請先上傳 PDF");

    try {
      setLoading(true);

      const blob = await smartCleanPDF(file);

      setResult(blob);

      toast.success("清理完成！");
    } catch (err) {
      console.error(err);
      toast.error("處理失敗");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="Smart Clean PDF"
      description="自動移除空白頁與無效內容頁"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Dropzone
          onFile={(f) => {
            setFile(f);
            toast.success("上傳成功");
          }}
        />

        {file && (
          <Card>
            <button
              onClick={handleRun}
              style={{
                padding: 12,
                background: "#4f46e5",
                color: "white",
                border: "none",
                borderRadius: 8,
              }}
            >
              🚀 開始智能清理
            </button>
          </Card>
        )}

        {loading && <LoadingOverlay text="AI 清理中..." />}

        {result && (
          <Card>
            <ResultBox
              title="清理完成"
              description="已移除無效頁面"
              onDownload={() =>
                downloadBlob(result, "smart-clean.pdf")
              }
            />
          </Card>
        )}
      </div>

      <div>
        <Card>
          <h3>🧠 Smart Clean 功能</h3>
          <ul>
            <li>自動刪除空白頁</li>
            <li>過小頁面過濾</li>
            <li>減少檔案雜訊</li>
            <li>提升閱讀體驗</li>
          </ul>
        </Card>
      </div>
    </ToolLayout>
  );
}
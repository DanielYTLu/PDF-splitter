import { useState } from "react";

import ToolLayout from "../components/ui/ToolLayout";
import Card from "../components/ui/Card";
import Dropzone from "../components/Dropzone";
import ResultBox from "../components/ui/ResultBox";
import LoadingOverlay from "../components/LoadingOverlay";

import { smartCleanPDF } from "../utils/smartCleanPDF";
import { downloadFile } from "../utils/downloadFile";

import toast from "react-hot-toast";

export default function SmartCleanPDF() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [minWidth, setMinWidth] = useState(100);
  const [minHeight, setMinHeight] = useState(100);
  const [removeBlankOnly, setRemoveBlankOnly] = useState(true);

  const handleRun = async () => {
    if (!file) return toast.error("請先上傳 PDF");

    try {
      setLoading(true);

      const blob = await smartCleanPDF(file, { minWidth, minHeight, removeBlankOnly });

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
            <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>最小寬度：{minWidth}px</label>
            <input type="range" min="50" max="300" value={minWidth} onChange={(e) => setMinWidth(Number(e.target.value))} style={{ width: "100%", marginBottom: 10 }} />

            <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>最小高度：{minHeight}px</label>
            <input type="range" min="50" max="300" value={minHeight} onChange={(e) => setMinHeight(Number(e.target.value))} style={{ width: "100%", marginBottom: 10 }} />

            <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <input type="checkbox" checked={removeBlankOnly} onChange={(e) => setRemoveBlankOnly(e.target.checked)} />
              只移除空白/過小頁
            </label>

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
                downloadFile(result, "smart-clean.pdf")
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
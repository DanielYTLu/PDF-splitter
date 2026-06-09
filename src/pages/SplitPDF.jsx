import { useState } from "react";

import usePDFTool from "../hooks/usePDFTool";
import useResult from "../hooks/useResult";

import ToolLayout from "../components/ui/ToolLayout";
import Card from "../components/ui/Card";

import PDFViewer from "../components/PDFViewer";
import PDFPreview from "../components/PDFPreview";
import Dropzone from "../components/Dropzone";
import LoadingOverlay from "../components/LoadingOverlay";
import ResultBox from "../components/ui/ResultBox";

import EmptyState from "../components/EmptyState";

import toast from "react-hot-toast";

import { useWorkflow } from "../context/WorkflowContext";
import { getTool } from "../tools";
import { downloadBlob } from "../utils/downloadFile";

export default function SplitPDF() {
  const [selectedPages, setSelectedPages] = useState([]);

  const { addStep } = useWorkflow();

  const {
    file: pdfFile,
    setFile: setPdfFile,
    setError,
  } = usePDFTool();

  const { result, loading, start, success, reset } = useResult();

  const splitTool = getTool("split");

  // =========================
  // ⚡ Direct Mode
  // =========================
  const handleDirectSplit = async () => {
    if (!pdfFile) return toast.error("請先上傳 PDF");
    if (!selectedPages.length) return toast.error("請選擇頁面");

    try {
      start();

      const blob = await splitTool.runDirect({
        file: pdfFile,
        pages: selectedPages,
      });

      success({ data: blob });

      toast.success("PDF 分割完成");
    } catch (err) {
      console.error(err);
      setError?.("PDF 分割失敗");
      toast.error("分割失敗");
    }
  };

  // =========================
  // 🔗 Workflow Mode
  // =========================
  const handleAddWorkflow = () => {
    if (!pdfFile) return toast.error("請先上傳 PDF");
    if (!selectedPages.length) return toast.error("請選擇頁面");

    addStep({
      type: "split",
      label: "PDF 分割",

      run: async (input) => {
        const blob = await splitTool.run({
          file: input?.file || pdfFile,
          pages: selectedPages,
        });

        return {
          data: blob.data || blob,
          pages: selectedPages,
          source: "workflow",
        };
      },
    });

    toast.success("已加入 Workflow");
  };

  return (
    <ToolLayout>
      {/* LEFT */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Card>
          <Dropzone
            onFile={(file) => {
              if (!file) return;
              setPdfFile(file);
              toast.success("上傳成功！");
              window.__TEST_FILE = file;
            }}
          />
        </Card>

        {pdfFile && (
          <Card>
            <PDFViewer
              file={pdfFile}
              selectedPages={selectedPages}
              setSelectedPages={setSelectedPages}
              setError={setError}
            />
          </Card>
        )}
      </div>

      {/* RIGHT */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {pdfFile && (
          <Card>
            <PDFPreview
              pdfFile={pdfFile}
              selectedPages={selectedPages}
              onSplit={handleDirectSplit}
              loading={loading}
            />

            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
              <button
                onClick={handleDirectSplit}
                disabled={loading}
                style={{
                  padding: 12,
                  background: "#0ea5e9",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                }}
              >
                ⚡ 直接分割
              </button>

              <button
                onClick={handleAddWorkflow}
                style={{
                  padding: 12,
                  background: "#4f46e5",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                }}
              >
                🔗 加入 Workflow
              </button>
            </div>
          </Card>
        )}

        {loading && <LoadingOverlay text="處理中..." />}

        {result && (
          <Card>
            <ResultBox
              title="PDF 分割完成"
              description="你的檔案已成功處理"
              onDownload={() => downloadBlob(result.data, "split.pdf")}
              onReset={reset}
            />
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
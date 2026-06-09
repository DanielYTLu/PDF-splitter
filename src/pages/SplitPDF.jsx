import { useState } from "react";
import usePDFTool from "../hooks/usePDFTool";
import useResult from "../hooks/useResult";

import ToolLayout from "../components/ui/ToolLayout";
import Card from "../components/ui/Card";

import PDFViewer from "../components/PDFViewer";
import PDFPreview from "../components/PDFPreview";
import Dropzone from "../components/Dropzone";
import EmptyState from "../components/EmptyState";
import LoadingOverlay from "../components/LoadingOverlay";
import ResultBox from "../components/ui/ResultBox";

import { splitPDF } from "../utils/pdfSplitter";
import { downloadBlob } from "../utils/downloadFile";

import { useWorkflow } from "../context/WorkflowContext";

import toast from "react-hot-toast";

export default function SplitPDF() {
  const [selectedPages, setSelectedPages] = useState([]);

  const { addStep } = useWorkflow();

  const {
    file: pdfFile,
    setFile: setPdfFile,
    setError,
  } = usePDFTool();

  const { result, loading, start, success, reset } = useResult();

  // =========================
  // ⚡ Mode 1：直接執行（iLovePDF）
  // =========================
  const handleDirectSplit = async () => {
    if (!pdfFile) return toast.error("請先上傳 PDF");
    if (!selectedPages.length) return toast.error("請選擇頁面");

    try {
      start();

      const blob = await splitPDF(pdfFile, selectedPages);

      success(blob);

      toast.success("PDF 分割完成");
    } catch (err) {
      console.error(err);
      setError?.("PDF 分割失敗");
      toast.error("分割失敗");
    }
  };

  // =========================
  // 🔗 Mode 2：加入 Workflow
  // =========================
  const handleAddWorkflow = () => {
    if (!pdfFile) return toast.error("請先上傳 PDF");
    if (!selectedPages.length) return toast.error("請選擇頁面");

    addStep({
      type: "split",
      label: "PDF 分割",

      run: async (input) => {
        console.log("Workflow Split running:", input);

        // 👉 真正 workflow 邏輯（之後可接 splitPDF util）
        const blob = await splitPDF(
          input?.file || pdfFile,
          selectedPages
        );

        return {
          data: blob,
          pages: selectedPages,
          source: "workflow",
        };
      },
    });

    toast.success("已加入 Workflow");
  };

  return (
    <ToolLayout>

      {/* LEFT SIDE */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

        {/* Upload */}
        <Card>
          <Dropzone
            onFile={(file) => {
              if (!file) return;

              setPdfFile(file);
              toast.success("上傳成功！");
            }}
          />
        </Card>

        {/* Viewer */}
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

      {/* RIGHT SIDE */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

        {/* Preview + Actions */}
        {pdfFile && (
          <Card>
            <PDFPreview
              pdfFile={pdfFile}
              selectedPages={selectedPages}
              onSplit={handleDirectSplit}
              loading={loading}
            />

            {/* 🆕 Dual Mode Buttons */}
            <div style={styles.actions}>
              <button
                onClick={handleDirectSplit}
                disabled={loading}
                style={{
                  ...styles.button,
                  background: "#0ea5e9",
                }}
              >
                ⚡ 直接分割
              </button>

              <button
                onClick={handleAddWorkflow}
                style={{
                  ...styles.button,
                  background: "#4f46e5",
                }}
              >
                🔗 加入 Workflow
              </button>
            </div>
          </Card>
        )}

        {/* Loading */}
        {loading && (
          <LoadingOverlay text="正在處理 PDF..." />
        )}

        {/* Result */}
        {result && (
          <Card>
            <ResultBox
              title="PDF 分割完成"
              description="你的檔案已成功處理"
              onDownload={() =>
                downloadBlob(result.data, "split.pdf")
              }
              onReset={() => {
                reset();
                setPdfFile(null);
                setSelectedPages([]);
              }}
            />
          </Card>
        )}

      </div>
    </ToolLayout>
  );
}

// =========================
// styles
// =========================

const styles = {
  actions: {
    marginTop: 12,
    display: "flex",
    gap: 12,
  },

  button: {
    padding: "12px 18px",
    borderRadius: 12,
    border: "none",
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
    width: "fit-content",
  },
};
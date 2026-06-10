import { useState } from "react";

import usePDFTool from "../hooks/usePDFTool";
import useResult from "../hooks/useResult";

import ToolLayout from "../components/ui/ToolLayout";
import Card from "../components/ui/Card";

import PDFPreview from "../components/PDFPreview";
import Dropzone from "../components/Dropzone";
import LoadingOverlay from "../components/LoadingOverlay";
import ResultBox from "../components/ui/ResultBox";

import toast from "react-hot-toast";

import { downloadBlob } from "../utils/downloadFile";
import { splitPDF } from "../utils/pdfSplitter";

export default function SplitPDF() {
  const [selectedPages, setSelectedPages] = useState([]);

  const {
    file: pdfFile,
    setFile: setPdfFile,
    setError,
  } = usePDFTool();

  const { result, loading, start, success, reset } =
    useResult();

  const handleSplit = async () => {
    if (!pdfFile) {
      return toast.error("請先上傳 PDF");
    }

    if (!selectedPages.length) {
      return toast.error("請選擇頁面");
    }

    try {
      start();

      const blob = await splitPDF(
        pdfFile,
        selectedPages
      );

      success({
        data: blob,
      });

      toast.success("PDF 分割完成");
    } catch (err) {
      console.error(err);

      setError?.("PDF 分割失敗");

      toast.error("分割失敗");
    }
  };

  return (
    <ToolLayout>
      {/* LEFT */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <Dropzone
          onFile={(file) => {
            if (!file) return;

            setPdfFile(file);

            toast.success("上傳成功！");
          }}
        />
      </div>

      {/* RIGHT */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {pdfFile && (
          <Card>
            <PDFPreview
              pdfFile={pdfFile}
              selectedPages={selectedPages}
              onSplit={handleSplit}
              loading={loading}
            />

            <button
              onClick={handleSplit}
              disabled={loading}
              style={{
                width: "100%",
                marginTop: 12,
                padding: 12,
                background: "#0ea5e9",
                color: "white",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              ✂️ 開始分割
            </button>
          </Card>
        )}

        {loading && (
          <LoadingOverlay text="處理中..." />
        )}

        {result && (
          <Card>
            <ResultBox
              title="PDF 分割完成"
              description="你的檔案已成功處理"
              onDownload={() =>
                downloadBlob(
                  result.data,
                  "split.pdf"
                )
              }
              onReset={reset}
            />
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
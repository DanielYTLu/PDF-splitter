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

import toast from "react-hot-toast";

export default function SplitPDF() {
  const [selectedPages, setSelectedPages] = useState([]);

  const {
    file: pdfFile,
    setFile: setPdfFile,
    setError,
  } = usePDFTool();

  const {
    result,
    loading,
    start,
    success,
    reset,
  } = useResult();

  const handleSplit = async () => {
    if (!pdfFile) return toast.error("請先上傳 PDF");
    if (!selectedPages.length) return toast.error("請選擇頁面");

    try {
      start();

      const blob = await splitPDF(pdfFile, selectedPages);

      success(blob);
    } catch (err) {
      console.error(err);
      setError?.("PDF 分割失敗");
    }
  };

  return (
    <ToolLayout
      title=" ✂️PDF 分割"
      description="快速選取 PDF 頁面並進行分割"
    >
      {/* LEFT */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Card>
          <Dropzone
            onFile={(file) => {
              if (!file) return;

              setPdfFile(file);
              toast.success("上傳成功！");
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
              onSplit={handleSplit}
              loading={loading}
            />
          </Card>
        )}

      

        {loading && (
          <LoadingOverlay text="正在處理 PDF..." />
        )}

        {result && (
          <Card>
            <ResultBox
              title="PDF 分割完成"
              description="你的檔案已成功處理"
              onDownload={() => downloadBlob(result.data, "split.pdf")}
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
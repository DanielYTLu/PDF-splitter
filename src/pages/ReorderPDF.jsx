import { useState, useEffect } from "react";

import FileUploader from "../components/FileUploader";
import PageSelector from "../components/PageSelector";
import Loading from "../components/Loading";

import toast from "react-hot-toast";

import { buildReorderedPDF } from "../utils/reorderPages";
import { downloadFile } from "../utils/downloadFile";
import { getPDFPageCount } from "../utils/getPDFPageCount";
import { renderPage } from "../utils/renderPDFPage";

export default function ReorderPDF() {
  const [pdfFile, setPdfFile] = useState(null);
  const [orderedPages, setOrderedPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pdfFile) return;

    const loadPages = async () => {
      try {
        setLoading(true);

        const count = await getPDFPageCount(pdfFile);

        const pages = await Promise.all(
          Array.from({ length: count }, async (_, i) => {
            const page = await renderPage(pdfFile, i + 1, 0.5);

            return {
              id: i + 1,
              thumbnail: page.src,
              width: page.width,
              height: page.height,
              selected: false,
            };
          })
        );

        setOrderedPages(pages);
      } catch (err) {
        console.error(err);
        setError("PDF 載入失敗");
      } finally {
        setLoading(false);
      }
    };

    loadPages();
  }, [pdfFile]);

  const handleExport = async () => {
    try {
      setLoading(true);

      const blob = await buildReorderedPDF(
        pdfFile,
        orderedPages
      );

      downloadFile(blob, "reordered.pdf");

      toast.success("輸出成功");
    } catch (err) {
      console.error(err);
      toast.error("輸出失敗");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🔀 PDF 頁面重新排序</h2>

      {loading && <Loading text="處理中..." />}

      {!pdfFile && (
        <FileUploader onFile={setPdfFile} />
      )}

      {pdfFile && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "3fr 300px",
            gap: 20,
          }}
        >
          <PageSelector
            orderedPages={orderedPages}
            setOrderedPages={setOrderedPages}
          />

          <div
            style={{
              padding: 16,
              border: "1px solid #e2e8f0",
              borderRadius: 12,
            }}
          >
            <h3>控制面板</h3>

            <p>共 {orderedPages.length} 頁</p>

            <button
              onClick={() =>
                setOrderedPages([...orderedPages].reverse())
              }
              style={{
                width: "100%",
                marginBottom: 10,
                padding: 10,
              }}
            >
              🔄 反轉順序
            </button>

            <button
              onClick={handleExport}
              style={{
                width: "100%",
                padding: 12,
                background: "#7c3aed",
                color: "#fff",
                border: "none",
                borderRadius: 8,
              }}
            >
              🔀 匯出 PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
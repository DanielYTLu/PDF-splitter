import { useState, useEffect } from "react";

import { ArrowLeftRight, Layers3, Sparkles } from "lucide-react";

import FileUploader from "../components/FileUploader";
import PageSelector from "../components/PageSelector";
import Loading from "../components/Loading";
import ToolPageShell from "../components/ToolPageShell";

import toast from "react-hot-toast";

import { buildReorderedPDF } from "../utils/reorderPages";
import { downloadFile } from "../utils/downloadFile";
import { getPDFPageCount } from "../utils/getPDFPageCount";
import { renderPage } from "../utils/renderPDFPage";

export default function ReorderPDF() {
  const [pdfFile, setPdfFile] = useState(null);
  const [orderedPages, setOrderedPages] = useState([]);
  const [originalPages, setOriginalPages] = useState([]);
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
        setOriginalPages(pages.map((page) => ({ ...page })));
      } catch (err) {
        console.error(err);
        setError("PDF 載入失敗");
      } finally {
        setLoading(false);
      }
    };

    loadPages();
  }, [pdfFile]);

  const handleResetOrder = () => {
    setOrderedPages(originalPages.map((page) => ({ ...page })));
  };

  const handleReverseOrder = () => {
    setOrderedPages((prev) => [...prev].reverse());
  };

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
    <ToolPageShell
      badge="Reorder Pages"
      title="🔀 PDF 頁面重新排序"
      subtitle="拖曳縮圖調整順序、點選頁面做重點標記，最後一鍵匯出精美的新 PDF。"
      accent="#7c3aed"
      meta={
        <>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--muted)", fontSize: 13 }}>
            <Layers3 size={14} />
            {orderedPages.length || 0} 頁
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#7c3aed", fontSize: 13 }}>
            <ArrowLeftRight size={14} />
            拖曳排序即可
          </span>
        </>
      }
    >

      {loading && <Loading text="處理中..." />}

      {!pdfFile && (
        <FileUploader onFile={setPdfFile} />
      )}

      {pdfFile && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) 320px",
            gap: 20,
            alignItems: "start",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                flexWrap: "wrap",
                background: "linear-gradient(135deg, var(--card) 0%, rgba(124, 58, 237, 0.10) 100%)",
                border: "1px solid var(--border)",
                borderRadius: 18,
                padding: "12px 14px",
                boxShadow: "0 10px 30px rgba(124, 58, 237, 0.08)",
              }}
            >
              <div>
                <div style={{ fontSize: 13, color: "#7c3aed", fontWeight: 700, marginBottom: 2 }}>排序提示</div>
                <div style={{ fontSize: 14, color: "var(--muted)" }}>拖曳任一頁面即可重新排列；點選頁面可標記重點。</div>
              </div>
              <span
                style={{
                  padding: "6px 10px",
                  background: "rgba(124, 58, 237, 0.12)",
                  color: "#a78bfa",
                  borderRadius: 999,
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                拖曳 / 點選 / 匯出
              </span>
            </div>

            <PageSelector
              orderedPages={orderedPages}
              setOrderedPages={setOrderedPages}
            />
          </div>

          <aside
            style={{
              padding: 16,
              border: "1px solid var(--border)",
              borderRadius: 18,
              background: "linear-gradient(180deg, var(--card) 0%, rgba(124, 58, 237, 0.08) 100%)",
              boxShadow: "0 18px 40px rgba(15, 23, 42, 0.08)",
              position: "sticky",
              top: 20,
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: 8, color: "var(--text)" }}>控制面板</h3>
            <p style={{ marginTop: 0, marginBottom: 14, color: "var(--muted)", fontSize: 14 }}>
              目前共 {orderedPages.length} 頁，直接拖曳即可調整順序。
            </p>

            <div style={{ display: "grid", gap: 10, marginBottom: 14 }}>
              <button
                onClick={handleResetOrder}
                style={buttonStyle("var(--card)", "var(--border)", "var(--text)")}
              >
                ↺ 重設順序
              </button>
              <button
                onClick={handleReverseOrder}
                style={buttonStyle("rgba(124, 58, 237, 0.08)", "rgba(124, 58, 237, 0.22)", "#c4b5fd")}
              >
                🔄 反轉順序
              </button>
            </div>

            <button
              onClick={handleExport}
              style={buttonStyle("linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)", "transparent", "#fff", true)}
            >
              🚀 匯出 PDF
            </button>

            <div
              style={{
                marginTop: 14,
                padding: 12,
                borderRadius: 14,
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--muted)",
                fontSize: 13,
                lineHeight: 1.5,
              }}
            >
              提示：匯出後會保留你目前整理好的頁面順序；選中的頁面會在卡片上顯示藍色標記，方便確認。
            </div>
          </aside>
        </div>
      )}
    </ToolPageShell>
  );
}

function buttonStyle(background, border, color, primary = false) {
  return {
    width: "100%",
    padding: "11px 12px",
    background,
    color,
    border: `1px solid ${border}`,
    borderRadius: 12,
    cursor: "pointer",
    fontWeight: 700,
    boxShadow: primary ? "0 14px 24px rgba(124, 58, 237, 0.18)" : "none",
    transition: "transform 120ms ease, boxShadow 120ms ease",
  };
}
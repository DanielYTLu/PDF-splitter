import { useState, useEffect } from "react";

import Dropzone from "../components/Dropzone";
import Card from "../components/ui/Card";
import PageSelector from "../components/PageSelector";
import LoadingOverlay from "../components/LoadingOverlay";

import toast from "react-hot-toast";

import { PDFDocument } from "pdf-lib";

import { splitPDF } from "../utils/pdfSplitter";
import { downloadFile } from "../utils/downloadFile";
import { parsePageRange } from "../utils/parsePageRange";
import { splitEachPageToZip } from "../utils/splitEachPageToZip";
import { renderPage } from "../utils/renderPDFPage";

export default function SplitPDF() {
  const [file, setFile] = useState(null);
  const [mode, setMode] = useState("select");
  const [selectedPages, setSelectedPages] = useState([]);
  const [rangeInput, setRangeInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [orderedPages, setOrderedPages] = useState([]);
  // =========================
  // 📄 PDF page count
  // =========================
useEffect(() => {
  const load = async () => {
    if (!file) return;

    try {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);

      const count = pdf.getPageCount();

      setTotalPages(count);

      const selected =
        Array.from(
          { length: count },
          (_, i) => i + 1
        );

      setSelectedPages(selected);

      const thumbnails = await Promise.all(
  selected.map(async (id) => {
    const page = await renderPage(file, id, 0.45);

    return {
      id,
      thumbnail: page.src,
      width: page.width,
      height: page.height,
      selected: true,
    };
  })
);

setOrderedPages(thumbnails);

      setOrderedPages(thumbnails);
    } catch (err) {
      console.error(err);
      toast.error("PDF 解析失敗");
    }
  };

  load();
}, [file]);

  // =========================
  // ✂️ split engine
  // =========================
  const handleSplit = async () => {
    if (!file) return toast.error("請先上傳 PDF");

    try {
      setLoading(true);

      let pages = [];

      if (mode === "select") {
        if (!selectedPages.length) {
          toast.error("請選擇頁面");
          return;
        }
        pages = orderedPages
  .filter((p) =>
    selectedPages.includes(p.id)
  )
  .map((p) => p.id);
      }

      if (mode === "range") {
        pages = parsePageRange(rangeInput, totalPages);
        if (!pages.length) {
          toast.error("請輸入有效範圍");
          return;
        }
      }

      if (mode === "every") {
        const zipBlob = await splitEachPageToZip(file);
        downloadFile(zipBlob, "split-pages.zip");
        toast.success("已分割為每頁 PDF（ZIP）");
        return;
      }

      const blob = await splitPDF(file, pages);

      downloadFile(blob, "split.pdf");
      toast.success("分割完成");
    } catch (err) {
      console.error(err);
      toast.error("分割失敗");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>✂️ Split PDF Pro</h1>

      <Card>
        <Dropzone onFile={setFile} />
      </Card>

      {file && (
        <Card>
          <div style={styles.segment}>
            {[
              { key: "select", label: "指定頁面" },
              { key: "range", label: "頁面範圍" },
              { key: "every", label: "全部分割" },
            ].map((m) => (
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
                style={{
                  ...styles.segmentBtn,
                  ...(mode === m.key
                    ? styles.segmentActive
                    : {}),
                }}
              >
                {m.label}
              </button>
            ))}
          </div>

          {mode === "range" && (
            <input
              value={rangeInput}
              onChange={(e) =>
                setRangeInput(e.target.value)
              }
              placeholder="例如：1-3, 5, 7-10"
              style={styles.input}
            />
          )}
        </Card>
      )}

      {file && mode === "select" && (
        <Card>
          <PageSelector
  pdfFile={file}
  orderedPages={orderedPages}
  setOrderedPages={setOrderedPages}
  selectedPages={selectedPages}
  setSelectedPages={setSelectedPages}
/>
        </Card>
      )}

      {file && (
        <div style={styles.actionBar}>
          <button onClick={handleSplit} style={styles.button}>
            ✂️ 開始分割
          </button>
        </div>
      )}

      {loading && (
        <LoadingOverlay text="正在處理 PDF..." />
      )}
    </div>
  );
}

/* =========================
🎨 styles（補回來！）
========================= */
const styles = {
  page: {
    padding: 24,
    maxWidth: 900,
    margin: "0 auto",
  },

  title: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 20,
  },

  segment: {
    display: "flex",
    background: "#f1f5f9",
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },

  segmentBtn: {
    flex: 1,
    padding: "8px 10px",
    borderRadius: 10,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: 13,
    color: "#475569",
  },

  segmentActive: {
    background: "#fff",
    color: "#0ea5e9",
    fontWeight: 600,
    boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
  },

  input: {
    marginTop: 12,
    width: "100%",
    padding: 10,
    borderRadius: 10,
    border: "1px solid #e2e8f0",
  },

  actionBar: {
    position: "sticky",
    bottom: 20,
    display: "flex",
    justifyContent: "center",
  },

  button: {
    padding: "12px 22px",
    background: "linear-gradient(135deg,#0ea5e9,#2563eb)",
    color: "white",
    borderRadius: 12,
    border: "none",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(14,165,233,0.3)",
  },
};
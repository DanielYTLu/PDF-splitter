import { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

// ✅ Vite + pdfjs 正確 worker（關鍵修正）
pdfjsLib.GlobalWorkerOptions.workerSrc =
  new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

function PDFViewer({ file, selectedPages, setSelectedPages, setError }) {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!file) return;

    let cancelled = false;

    const loadPDF = async () => {
      try {
        setLoading(true);
        setError?.(null);

        const arrayBuffer = await file.arrayBuffer();

        // ✅ 正確初始化（新版 pdfjs）
        const pdf = await pdfjsLib.getDocument({
          data: arrayBuffer,
        }).promise;

        const imgs = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 0.5 });

          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({
            canvasContext: ctx,
            viewport,
          }).promise;

          imgs.push(canvas.toDataURL());
        }

        if (!cancelled) setPages(imgs);
      } catch (err) {
        console.error("PDF ERROR FULL:", err);
        setError?.("PDF 解析失敗（檔案可能加密或格式不支援）");
      } finally {
        setLoading(false);
      }
    };

    loadPDF();

    return () => {
      cancelled = true;
    };
  }, [file]);

  const togglePage = (pageNum) => {
    setSelectedPages((prev) =>
      Array.isArray(prev)
        ? prev.includes(pageNum)
          ? prev.filter((p) => p !== pageNum)
          : [...prev, pageNum]
        : [pageNum]
    );
  };

  if (loading) {
    return <div>📄 PDF 載入中...</div>;
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 10,
        marginTop: 20,
      }}
    >
      {pages.map((img, i) => {
        const pageNum = i + 1;
        const selected = selectedPages.includes(pageNum);

        return (
          <div
            key={i}
            onClick={() => togglePage(pageNum)}
            style={{
              border: selected ? "3px solid #2563eb" : "1px solid #ccc",
              borderRadius: 8,
              cursor: "pointer",
              position: "relative",
            }}
          >
            <input

            
              type="checkbox"
              checked={selected}
              onChange={() => togglePage(pageNum)}
              style={{ position: "absolute", top: 6, left: 6 }}
            />

            <img src={img} style={{ width: "100%" }} />

            <p style={{ textAlign: "center" }}>
              第 {pageNum} 頁 {selected ? "✔" : ""}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default PDFViewer;
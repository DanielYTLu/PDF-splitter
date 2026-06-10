import { PDFDocument } from "pdf-lib";

/**
 * Smart Clean PDF
 * - 移除空白頁
 * - 保留有內容頁
 */
export async function smartCleanPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);

  const pages = pdfDoc.getPages();
  const newPdf = await PDFDocument.create();

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];

    const { width, height } = page.getSize();

    // 👉 簡單 heuristic（未來可升級 AI）
    const isLikelyEmpty =
      width === 0 ||
      height === 0 ||
      (width < 100 && height < 100);

    if (!isLikelyEmpty) {
      const [copiedPage] = await newPdf.copyPages(
        pdfDoc,
        [i]
      );
      newPdf.addPage(copiedPage);
    }
  }

  const bytes = await newPdf.save();
  return new Blob([bytes], {
    type: "application/pdf",
  });
}
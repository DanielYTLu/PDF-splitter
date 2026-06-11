import { PDFDocument } from "pdf-lib";

export async function mergePDF(files, settings = {}) {
  const mergedPdf = await PDFDocument.create();

  let orderedFiles = [...files];

  // =========================
  // 🔀 排序模式
  // =========================
  if (settings.mode === "reverse") {
    orderedFiles.reverse();
  }

  for (const file of orderedFiles) {
    const bytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(bytes);

    const pages = await mergedPdf.copyPages(
      pdf,
      pdf.getPageIndices()
    );

    pages.forEach((page) => mergedPdf.addPage(page));
  }

  const pdfBytes = await mergedPdf.save();

  return new Blob([pdfBytes], {
    type: "application/pdf",
  });
}
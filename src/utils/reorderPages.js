import { PDFDocument } from "pdf-lib";

export async function buildReorderedPDF(file, orderedPages) {
  const bytes = await file.arrayBuffer();
  const pdf = await PDFDocument.load(bytes);

  const newPdf = await PDFDocument.create();

  const indexes = orderedPages.map(p => p.id - 1);

  const copiedPages = await newPdf.copyPages(pdf, indexes);

  copiedPages.forEach(p => newPdf.addPage(p));

  const pdfBytes = await newPdf.save();

  return new Blob([pdfBytes], { type: "application/pdf" });
}
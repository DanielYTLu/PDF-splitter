import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";

export async function splitEachPageToZip(file) {
  const bytes = await file.arrayBuffer();
  const pdf = await PDFDocument.load(bytes);
  const pageCount = pdf.getPageCount();

  const zip = new JSZip();

  for (let i = 0; i < pageCount; i++) {
    const newPdf = await PDFDocument.create();

    const [copiedPage] = await newPdf.copyPages(pdf, [i]);
    newPdf.addPage(copiedPage);

    const pdfBytes = await newPdf.save();

    zip.file(`page-${i + 1}.pdf`, pdfBytes);
  }

  const zipBlob = await zip.generateAsync({ type: "blob" });

  return zipBlob;
}
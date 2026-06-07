import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";

export async function compressPDF(file) {
  const bytes = await file.arrayBuffer();

  const pdf = await PDFDocument.load(bytes);

  const newPdf = await PDFDocument.create();

  const pages = await newPdf.copyPages(
    pdf,
    pdf.getPageIndices()
  );

  pages.forEach((page) => {
    newPdf.addPage(page);
  });

  // ⚠️ 關鍵：降低解析度（間接壓縮）
  const pdfBytes = await newPdf.save({
    useObjectStreams: false,
  });

  saveAs(
    new Blob([pdfBytes]),
    "compressed.pdf"
  );
}
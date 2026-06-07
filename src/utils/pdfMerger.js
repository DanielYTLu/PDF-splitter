import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";

export async function mergePDF(files) {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const bytes = await file.arrayBuffer();

    const pdf = await PDFDocument.load(bytes);

    const pages = await mergedPdf.copyPages(
      pdf,
      pdf.getPageIndices()
    );

    pages.forEach((page) =>
      mergedPdf.addPage(page)
    );
  }

  const pdfBytes = await mergedPdf.save();

  saveAs(
    new Blob([pdfBytes]),
    "merged.pdf"
  );
}
import { PDFDocument } from "pdf-lib";

export async function unlockPDF(file, password) {
  const bytes = await file.arrayBuffer();

  const pdfDoc = await PDFDocument.load(bytes, {
    password,
  });

  const newPdf = await PDFDocument.create();

  const pages = await newPdf.copyPages(
    pdfDoc,
    pdfDoc.getPageIndices()
  );

  pages.forEach((page) =>
    newPdf.addPage(page)
  );

  const pdfBytes = await newPdf.save();

  const blob = new Blob([pdfBytes], {
    type: "application/pdf",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "unlocked.pdf";
  a.click();

  URL.revokeObjectURL(url);
}
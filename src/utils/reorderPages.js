import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";

export async function reorderPages(file, pageOrder) {
  const bytes = await file.arrayBuffer();

  const pdf = await PDFDocument.load(bytes);

  const newPdf = await PDFDocument.create();

  const copiedPages = await newPdf.copyPages(
    pdf,
    pageOrder.map((p) => p - 1)
  );

  copiedPages.forEach(page => {
    newPdf.addPage(page);
  });

  const pdfBytes = await newPdf.save();

  saveAs(
    new Blob([pdfBytes]),
    "reordered.pdf"
  );
}
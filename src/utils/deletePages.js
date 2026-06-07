import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";

export async function deletePages(
  file,
  pagesToKeep
) {
  const bytes = await file.arrayBuffer();

  const pdf = await PDFDocument.load(bytes);

  const newPdf = await PDFDocument.create();

  const copiedPages =
    await newPdf.copyPages(
      pdf,
      pagesToKeep.map((p) => p - 1)
    );

  copiedPages.forEach((page) =>
    newPdf.addPage(page)
  );

  const pdfBytes = await newPdf.save();

  saveAs(
    new Blob([pdfBytes]),
    "deleted-pages.pdf"
  );
}
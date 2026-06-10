import { PDFDocument } from "pdf-lib";

export async function splitPDF(
  file,
  pagesArray
) {

  const bytes =
    await file.arrayBuffer();

  const pdf =
    await PDFDocument.load(bytes);

  const newPdf =
    await PDFDocument.create();

  const copiedPages =
    await newPdf.copyPages(
      pdf,
      pagesArray.map(
        (p) => p - 1
      )
    );

  copiedPages.forEach((p) =>
    newPdf.addPage(p)
  );

  const pdfBytes =
    await newPdf.save();

  return new Blob(
    [pdfBytes],
    {
      type: "application/pdf",
    }
  );
}
import { PDFDocument } from "pdf-lib";

export async function extractPDF(
  file,
  selectedPages
) {
  const bytes =
    await file.arrayBuffer();

  const sourcePdf =
    await PDFDocument.load(bytes);

  const newPdf =
    await PDFDocument.create();

  const copiedPages =
    await newPdf.copyPages(
      sourcePdf,
      selectedPages.map(
        (page) => page - 1
      )
    );

  copiedPages.forEach((page) =>
    newPdf.addPage(page)
  );

  const pdfBytes =
    await newPdf.save();

  const blob = new Blob(
    [pdfBytes],
    {
      type: "application/pdf",
    }
  );

  const url =
    URL.createObjectURL(blob);

  const a =
    document.createElement("a");

  a.href = url;
  a.download =
    "extracted-pages.pdf";

  a.click();

  URL.revokeObjectURL(url);
}
import { PDFDocument, degrees } from "pdf-lib";

export async function rotatePDF(
  file,
  selectedPages,
  angle
) {
  const bytes = await file.arrayBuffer();

  const pdfDoc =
    await PDFDocument.load(bytes);

  const pages = pdfDoc.getPages();

  selectedPages.forEach((pageNum) => {
    const page = pages[pageNum - 1];

    page.setRotation(
      degrees(angle)
    );
  });

  const pdfBytes =
    await pdfDoc.save();

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
  a.download = "rotated.pdf";
  a.click();

  URL.revokeObjectURL(url);
}
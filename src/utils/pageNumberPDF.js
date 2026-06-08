import {
  PDFDocument,
  rgb,
  StandardFonts,
} from "pdf-lib";

export async function pageNumberPDF(
  file,
  position = "right"
) {
  const bytes = await file.arrayBuffer();

  const pdfDoc =
    await PDFDocument.load(bytes);

  const font =
    await pdfDoc.embedFont(
      StandardFonts.Helvetica
    );

  const pages = pdfDoc.getPages();

  pages.forEach((page, index) => {
    const { width } = page.getSize();

    let x = width - 50;

    if (position === "center")
      x = width / 2;

    if (position === "left")
      x = 30;

    page.drawText(
      `${index + 1}`,
      {
        x,
        y: 20,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      }
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
  a.download =
    "page-numbered.pdf";

  a.click();

  URL.revokeObjectURL(url);
}
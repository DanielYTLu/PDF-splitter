import {
  PDFDocument,
  rgb,
  StandardFonts,
} from "pdf-lib";

export async function pageNumberPDF(
  file,
  options = {}
) {
  const {
    position = "bottomRight",
    size = 12,
    color = [0, 0, 0],
    startAt = 1,
    prefix = "",
    suffix = "",
    vertical = "bottom",
  } = options;
  const bytes = await file.arrayBuffer();

  const pdfDoc =
    await PDFDocument.load(bytes);

  const font =
    await pdfDoc.embedFont(
      StandardFonts.Helvetica
    );

  const pages = pdfDoc.getPages();

  pages.forEach((page, index) => {
    const { width, height } = page.getSize();

    const text = `${prefix}${index + startAt}${suffix}`;
    let x = width - 50;
    let y = 20;

    if (position === "center" || position === "bottomCenter") x = width / 2;
    if (position === "left" || position === "bottomLeft") x = 30;
    if (position === "topLeft") x = 30;
    if (position === "topCenter") x = width / 2;
    if (position === "topRight") x = width - 50;

    if (vertical === "top" || position.startsWith("top")) y = height - 20;

    page.drawText(text, {
      x,
      y,
      size,
      font,
      color: rgb(color[0], color[1], color[2]),
    });
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
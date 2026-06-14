import {
  PDFDocument,
  rgb,
  degrees,
  StandardFonts,
} from "pdf-lib";

export async function watermarkPDF(
  file,
  text,
  options = {}
) {
  const {
    opacity = 0.35,
    size = 48,
    position = "center",
    rotation = -35,
    color = [0.65, 0.65, 0.65],
  } = options;
  const bytes = await file.arrayBuffer();

  const pdfDoc =
    await PDFDocument.load(bytes);

  const font =
    await pdfDoc.embedFont(
      StandardFonts.Helvetica
    );

  const pages = pdfDoc.getPages();

  const positions = {
    center: { x: 0.5, y: 0.5 },
    topLeft: { x: 0.12, y: 0.82 },
    topRight: { x: 0.78, y: 0.82 },
    bottomLeft: { x: 0.12, y: 0.18 },
    bottomRight: { x: 0.78, y: 0.18 },
  };

  pages.forEach((page) => {
    const { width, height } = page.getSize();
    const point = positions[position] || positions.center;

    page.drawText(text, {
      x: width * point.x,
      y: height * point.y,
      size,
      font,
      color: rgb(color[0], color[1], color[2]),
      opacity,
      rotate: degrees(rotation),
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
    "watermarked.pdf";

  a.click();

  URL.revokeObjectURL(url);
}
import {
  PDFDocument,
  degrees,
} from "pdf-lib";

export async function imageWatermarkPDF(
  pdfFile,
  imageFile,
  options = {}
) {
  const {
    opacity = 0.3,
    scale = 1,
    position = "center",
    rotation = 0,
  } = options;
  const pdfBytes =
    await pdfFile.arrayBuffer();

  const imageBytes =
    await imageFile.arrayBuffer();

  const pdfDoc =
    await PDFDocument.load(pdfBytes);

  let image;

  if (
    imageFile.type === "image/png"
  ) {
    image =
      await pdfDoc.embedPng(
        imageBytes
      );
  } else {
    image =
      await pdfDoc.embedJpg(
        imageBytes
      );
  }

  const pages = pdfDoc.getPages();
  const positions = {
    center: { x: 0.5, y: 0.5 },
    topLeft: { x: 0.18, y: 0.82 },
    topRight: { x: 0.82, y: 0.82 },
    bottomLeft: { x: 0.18, y: 0.18 },
    bottomRight: { x: 0.82, y: 0.18 },
  };

  const baseWidth = image.width;
  const baseHeight = image.height;
  const width = baseWidth * scale;
  const height = baseHeight * scale;

  pages.forEach((page) => {
    const { width: pageWidth, height: pageHeight } = page.getSize();
    const point = positions[position] || positions.center;

    page.drawImage(image, {
      x: pageWidth * point.x - width / 2,
      y: pageHeight * point.y - height / 2,
      width,
      height,
      opacity,
      rotate: degrees(rotation),
    });
  });

  const result =
    await pdfDoc.save();

  const blob = new Blob(
    [result],
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
    "logo-watermark.pdf";

  a.click();

  URL.revokeObjectURL(url);
}
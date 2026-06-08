import {
  PDFDocument,
} from "pdf-lib";

export async function imageWatermarkPDF(
  pdfFile,
  imageFile,
  opacity = 0.3
) {
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

  const pages =
    pdfDoc.getPages();

  pages.forEach((page) => {
    const { width, height } =
      page.getSize();

    page.drawImage(image, {
      x: width / 2 - 100,
      y: height / 2 - 100,
      width: 200,
      height: 200,
      opacity,
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
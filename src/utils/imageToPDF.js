import { PDFDocument } from "pdf-lib";

export async function imageToPDF(files) {
  const pdfDoc = await PDFDocument.create();

  for (const file of files) {
    const imageBytes = await file.arrayBuffer();

    let image;

    if (
      file.type === "image/png"
    ) {
      image = await pdfDoc.embedPng(imageBytes);
    } else {
      image = await pdfDoc.embedJpg(imageBytes);
    }

    const { width, height } = image.scale(1);

    const page = pdfDoc.addPage([
      width,
      height,
    ]);

    page.drawImage(image, {
      x: 0,
      y: 0,
      width,
      height,
    });
  }

  const pdfBytes = await pdfDoc.save();

  const blob = new Blob(
    [pdfBytes],
    {
      type: "application/pdf",
    }
  );

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = "images.pdf";
  a.click();

  URL.revokeObjectURL(url);
}
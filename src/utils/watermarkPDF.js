import {
  PDFDocument,
  rgb,
  degrees,
  StandardFonts,
} from "pdf-lib";

export async function watermarkPDF(
  file,
  text
) {
  const bytes = await file.arrayBuffer();

  const pdfDoc =
    await PDFDocument.load(bytes);

  const font =
    await pdfDoc.embedFont(
      StandardFonts.Helvetica
    );

  const pages = pdfDoc.getPages();

  pages.forEach((page) => {
    const { width, height } =
      page.getSize();

    page.drawText(text, {
      x: width / 4,
      y: height / 2,
      size: 40,
      font,
      color: rgb(
        0.75,
        0.75,
        0.75
      ),
      opacity: 0.3,
      rotate: degrees(-45),
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
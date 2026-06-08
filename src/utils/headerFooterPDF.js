import {
  PDFDocument,
  rgb,
  StandardFonts,
} from "pdf-lib";

export async function headerFooterPDF(
  file,
  header,
  footer
) {
  const bytes =
    await file.arrayBuffer();

  const pdfDoc =
    await PDFDocument.load(bytes);

  const font =
    await pdfDoc.embedFont(
      StandardFonts.Helvetica
    );

  const pages =
    pdfDoc.getPages();

  pages.forEach((page) => {
    const { width, height } =
      page.getSize();

    if (header) {
      page.drawText(header, {
        x: 40,
        y: height - 30,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
    }

    if (footer) {
      page.drawText(footer, {
        x: 40,
        y: 20,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      });
    }
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
    "header-footer.pdf";

  a.click();

  URL.revokeObjectURL(url);
}
import {
  PDFDocument,
  rgb,
  StandardFonts,
} from "pdf-lib";

export async function headerFooterPDF(
  file,
  header,
  footer,
  options = {}
) {
  const {
    headerSize = 12,
    footerSize = 12,
    color = [0, 0, 0],
    opacity = 1,
    align = "left",
  } = options;
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

    const textColor = rgb(color[0], color[1], color[2]);

    if (header) {
      const headerX = align === "center" ? width / 2 - font.widthOfTextAtSize(header, headerSize) / 2 : align === "right" ? width - 40 - font.widthOfTextAtSize(header, headerSize) : 40;
      page.drawText(header, {
        x: headerX,
        y: height - 30,
        size: headerSize,
        font,
        color: textColor,
        opacity,
      });
    }

    if (footer) {
      const footerX = align === "center" ? width / 2 - font.widthOfTextAtSize(footer, footerSize) / 2 : align === "right" ? width - 40 - font.widthOfTextAtSize(footer, footerSize) : 40;
      page.drawText(footer, {
        x: footerX,
        y: 20,
        size: footerSize,
        font,
        color: textColor,
        opacity,
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
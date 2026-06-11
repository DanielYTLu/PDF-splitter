import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";

export async function compressPDF(file, settings = {}) {
  const bytes = await file.arrayBuffer();
  const pdf = await PDFDocument.load(bytes);

  const newPdf = await PDFDocument.create();

  const pages = await newPdf.copyPages(
    pdf,
    pdf.getPageIndices()
  );

  pages.forEach((page) => newPdf.addPage(page));

  const level = settings.level || "medium";

  // 🧠 模擬壓縮策略（SaaS級關鍵）
  let options = {
    useObjectStreams: true,
  };

  if (level === "low") {
    options.useObjectStreams = false;
  }

  if (level === "high") {
    options.useObjectStreams = true;
  }

  const pdfBytes = await newPdf.save(options);

  const blob = new Blob([pdfBytes], {
    type: "application/pdf",
  });

  saveAs(
    blob,
    `compressed_${level}.pdf`
  );

  return blob;
}
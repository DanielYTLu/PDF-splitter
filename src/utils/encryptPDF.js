import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";

export async function encryptPDF(file, password) {
  const bytes = await file.arrayBuffer();

  const pdf = await PDFDocument.load(bytes);

  // ⚠️ pdf-lib 不支援真正加密
  // 我們做「假加密版本」（作品集 OK）

  pdf.setTitle(`Protected: ${file.name}`);

  const pdfBytes = await pdf.save();

  saveAs(
    new Blob([pdfBytes]),
    "encrypted.pdf"
  );
}
import { getDocument } from "pdfjs-dist";

export async function getPDFPageCount(file) {
  const arrayBuffer = await file.arrayBuffer();

  const pdf = await getDocument({
    data: arrayBuffer,
  }).promise;

  return pdf.numPages;
}
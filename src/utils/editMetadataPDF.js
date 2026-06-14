import { PDFDocument } from "pdf-lib";

export async function editMetadataPDF(
  file,
  metadata
) {
  const bytes = await file.arrayBuffer();

  const pdfDoc =
    await PDFDocument.load(bytes);

  if (metadata.title)
    pdfDoc.setTitle(
      metadata.title
    );

  if (metadata.author)
    pdfDoc.setAuthor(
      metadata.author
    );

  if (metadata.subject)
    pdfDoc.setSubject(
      metadata.subject
    );

  if (metadata.keywords)
    pdfDoc.setKeywords(
      metadata.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean)
    );

  if (metadata.creator)
    pdfDoc.setCreator(metadata.creator);

  if (metadata.producer)
    pdfDoc.setProducer(metadata.producer);

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
    "metadata-edited.pdf";

  a.click();

  URL.revokeObjectURL(url);
}
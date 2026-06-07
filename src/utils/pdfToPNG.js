import * as pdfjsLib from "pdfjs-dist";
import JSZip from "jszip";
import { saveAs } from "file-saver";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

export async function pdfToPNG(file) {
  const zip = new JSZip();

  const arrayBuffer = await file.arrayBuffer();

  const pdf = await pdfjsLib.getDocument({
    data: arrayBuffer,
  }).promise;

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);

    const viewport = page.getViewport({
      scale: 2,
    });

    const canvas =
      document.createElement("canvas");

    const ctx =
      canvas.getContext("2d");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
      canvasContext: ctx,
      viewport,
    }).promise;

    const blob = await new Promise(
      (resolve) =>
        canvas.toBlob(resolve, "image/png")
    );

    zip.file(
      `page-${i}.png`,
      blob
    );
  }

  const zipBlob =
    await zip.generateAsync({
      type: "blob",
    });

  saveAs(zipBlob, "images.zip");
}
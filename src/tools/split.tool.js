import { defineTool } from "./_baseTool";
import { splitPDF } from "../utils/pdfSplitter";

export const splitTool = defineTool({
  type: "split",
  label: "PDF 分割",

  // 🔗 Workflow mode
  run: async ({ file, pages }) => {
    const blob = await splitPDF(file, pages);

    return {
      data: blob,
      pages,
      type: "split",
    };
  },

  // ⚡ Direct mode
  runDirect: async ({ file, pages }) => {
    return await splitPDF(file, pages);
  },
});
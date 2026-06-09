import { defineTool } from "./_baseTool";
import { mergePDF } from "../utils/pdfMerger";

export const mergeTool = defineTool({
  type: "merge",
  label: "PDF 合併",

  // 🔗 Workflow mode
  run: async ({ files }) => {
    const blob = await mergePDF(files);

    return {
      data: blob,
      count: files.length,
      type: "merge",
    };
  },

  // ⚡ Direct mode
  runDirect: async ({ files }) => {
    return await mergePDF(files);
  },
});
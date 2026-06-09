import { splitPDF } from "../utils/pdfSplitter";
import { mergePDF } from "../utils/pdfMerger";

export const nodeRegistry = {
  split: {
    run: async (input) => {
      console.log("split node running");
      return input;
    },
  },

  merge: {
    run: async (input) => {
      console.log("merge node running");
      return input;
    },
  },
};
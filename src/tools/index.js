import { splitTool } from "./split.tool";
import { mergeTool } from "./merge.tool";

// 🚀 未來所有工具都放這裡
export const tools = {
  split: splitTool,
  merge: mergeTool,
};

// 🔥 workflow / AI 會用這個找工具
export const getTool = (type) => {
  return tools[type];
};
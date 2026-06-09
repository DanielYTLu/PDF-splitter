// 每個 tool 的標準格式（未來 AI / workflow 都靠這個）

export function defineTool(config) {
  return {
    type: config.type,
    label: config.label,

    // ⚡ workflow 用
    run: config.run,

    // ⚡ direct mode 用（可選）
    runDirect: config.runDirect,
  };
}
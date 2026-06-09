export async function runWorkflowV2(steps, initialInput) {
  let context = {
    ...initialInput,
  };

  const logs = [];

  for (const step of steps) {
    try {
      const input = {
        ...context,
      };

      const output = await step.run(input);

      // 🔥 核心：把 output merge 回 context
      context = {
        ...context,
        ...output,
      };

      logs.push({
        step: step.label,
        input,
        output,
      });
    } catch (err) {
      console.error("Workflow error:", step.label, err);
      throw err;
    }
  }

  return {
    result: context,
    logs,
  };
}   
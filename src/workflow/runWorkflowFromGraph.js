import { nodeRegistry } from "./nodeRegistry";

export async function runWorkflowFromGraph({ nodes, edges, initialInput }) {
  let current = initialInput;

  for (const node of nodes) {
    const handler = nodeRegistry[node.type]?.run;

    if (!handler) continue;

    current = await handler(current);
  }

  return current;
}
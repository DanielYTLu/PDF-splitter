import { nodeRegistry } from "./nodeRegistry";

/**
 * 找起點 nodes（沒有 incoming edge）
 */
function findStartNodes(nodes, edges) {
  const targets = new Set(edges.map((e) => e.to));
  return nodes.filter((n) => !targets.has(n.id));
}

/**
 * 建 adjacency list
 */
function buildGraph(edges) {
  const graph = new Map();

  for (const edge of edges) {
    if (!graph.has(edge.from)) {
      graph.set(edge.from, []);
    }
    graph.get(edge.from).push(edge.to);
  }

  return graph;
}

/**
 * Workflow Executor
 */
export async function executeGraph({ nodes, edges, initialInput }) {
  const graph = buildGraph(edges);
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  const startNodes = findStartNodes(nodes, edges);

  if (startNodes.length === 0) {
    throw new Error("No start node found");
  }

  let result = initialInput;

  /**
   * BFS execution queue
   */
  const queue = [...startNodes];

  const visited = new Set();

  while (queue.length > 0) {
    const node = queue.shift();

    if (visited.has(node.id)) continue;
    visited.add(node.id);

    const handler = nodeRegistry[node.type]?.run;

    if (handler) {
      console.log("▶ running node:", node.type);

      result = await handler(result);
    }

    const nextNodes = graph.get(node.id) || [];

    for (const nextId of nextNodes) {
      const nextNode = nodeMap.get(nextId);
      if (nextNode) queue.push(nextNode);
    }
  }

  return result;
}
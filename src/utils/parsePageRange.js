export function parsePageRange(input, totalPages = 0) {
  if (!input) return [];

  const result = new Set();

  const parts = input.split(",");

  for (let part of parts) {
    part = part.trim();

    // range: 1-5
    if (part.includes("-")) {
      const [start, end] = part.split("-").map(Number);

      for (let i = start; i <= end; i++) {
        result.add(i);
      }
    } else {
      const num = Number(part);
      if (!isNaN(num)) result.add(num);
    }
  }

  return Array.from(result)
    .filter((p) => p > 0)
    .filter((p) => (totalPages ? p <= totalPages : true))
    .sort((a, b) => a - b);
}
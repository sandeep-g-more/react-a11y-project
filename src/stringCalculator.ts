// src/stringCalculator.ts
export default function calculateFromString(input: string): number {
  if (!input) return 0;
  // replace newlines with commas, split, trim, filter empty, parse floats
  const tokens = input
    .replace(/\r\n/g, '\n')
    .replace(/\n/g, ',')
    .split(',')
    .map(t => t.trim())
    .filter(Boolean);

  const numbers = tokens.map(t => {
    // allow integers & floats; throw if not a valid number
    const n = Number(t);
    if (Number.isNaN(n)) {
      throw new Error(`Invalid number: "${t}"`);
    }
    return n;
  });

  // example behavior: sum numbers
  return numbers.reduce((s, n) => s + n, 0);
}

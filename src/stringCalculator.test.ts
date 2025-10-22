// tests/stringCalculator.test.ts
import calculateFromString from '../src/stringCalculator';

describe('calculateFromString', () => {
  test('returns 0 for empty input', () => {
    expect(calculateFromString('')).toBe(0);
  });

  test('sums comma separated numbers', () => {
    expect(calculateFromString('1,2,3')).toBe(6);
  });

  test('sums newline separated numbers', () => {
    expect(calculateFromString('1\n2\n3')).toBe(6);
  });

  test('trims spaces and ignores empty tokens', () => {
    expect(calculateFromString(' 1 ,  2 ,,3 ')).toBe(6);
  });

  test('handles floats', () => {
    expect(calculateFromString('1.5,2.25')).toBeCloseTo(3.75);
  });

  test('throws on invalid token', () => {
    expect(() => calculateFromString('1,foo,3')).toThrow(/Invalid number/);
  });
});

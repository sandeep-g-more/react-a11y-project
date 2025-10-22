import { stringCalculator } from '../src/stringCalculator';

describe('String Calculator', () => {
  test('returns 0 for empty input', () => {
    expect(stringCalculator('')).toBe(0);
  });

  test('sums numbers separated by comma or space', () => {
    expect(stringCalculator('1,2 3')).toBe(6);
  });

  test('throws error for invalid input', () => {
    expect(() => stringCalculator('1,a,3')).toThrow('Invalid number');
  });
});

/**
 * split a string at the given indexes
 *
 * e.g. splitAt('abcdefghijklmnop', 3, 6, 9) => ['abc', 'def', 'ghijklmonop']
 */
export function splitAt(value: string, ...points: number[]) {
  return [0, ...points].map((p, idx) => value.substr(p, (points[idx] ?? value.length) - p));
}

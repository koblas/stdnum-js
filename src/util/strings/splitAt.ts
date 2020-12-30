/**
 * split a string at the given indexes
 *
 * e.g. splitAt('abcdefghijklmnop', 3, 6, 9) => ['abc', 'def', 'ghijklmonop']
 */
export function splitAt(value: string, ...points: number[]): string[] {
  const parts = [0, ...points].map((p, idx) => {
    const nvalue = idx >= points.length ? value.length : points[idx];
    const np = nvalue < 0 ? value.length + nvalue : nvalue;
    const pp = p < 0 ? value.length + p : p;

    return value.substr(pp, np - pp);
  });

  return parts.filter(v => v.length !== 0);
}

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

    // Same as the former value.substr(pp, np - pp): a start that is still
    // negative (a point before the start of a short value) counts from the end
    const start = pp < 0 ? Math.max(value.length + pp, 0) : pp;

    return value.slice(start, start + Math.max(np - pp, 0));
  });

  return parts.filter(v => v.length !== 0);
}

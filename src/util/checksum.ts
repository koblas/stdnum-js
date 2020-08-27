export function weightedChecksum(value: string, weights: number[]) {
  return value.split("").reduce((acc, v, idx) => {
    if (idx >= weights.length) {
      return acc;
    }
    return acc + parseInt(v, 10) * weights[idx];
  }, 0);
}

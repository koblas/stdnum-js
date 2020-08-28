export function weightedChecksum(value: string, weights: number[], modulus?: number) {
  const weighted = value.split("").reduce((acc, v, idx) => {
    if (idx >= weights.length) {
      return acc;
    }
    const wv = parseInt(v, 10) * weights[idx];

    return acc + (modulus ? wv % modulus : wv);
  }, 0);

  return modulus ? weighted % modulus : weighted;
}

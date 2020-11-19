/**
 *
 */
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

export function luhnChecksum(value: string, alphabet: string = "0123456789") {
  const parity = value.length % 2;

  const sum = value
    .split("")
    .reverse()
    .map((v) => alphabet.indexOf(v))
    .reduce((acc, value, idx) => {
      const v = idx % 2 === parity ? value * 2 : value;

      return acc + (v > 9 ? v - 9 : v);
    }, 0);

  // return sum % 10 === 0;
  return sum % alphabet.length;
}

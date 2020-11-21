/**
 *
 */
export function weightedChecksum(
  value: string,
  weights: number[],
  modulus?: number,
): number {
  const weighted = value.split('').reduce((acc, v, idx) => {
    if (idx >= weights.length) {
      return acc;
    }
    const wv = parseInt(v, 10) * weights[idx];

    return acc + (modulus ? wv % modulus : wv);
  }, 0);

  return modulus ? weighted % modulus : weighted;
}

export function luhnChecksum(value: string, alphabet = '0123456789'): number {
  const parity = value.length % 2;

  const sum = value
    .split('')
    .reverse()
    .map(v => alphabet.indexOf(v))
    .reduce((acc, val, idx) => {
      const v = idx % 2 === parity ? val * 2 : val;

      return acc + (v > 9 ? v - 9 : v);
    }, 0);

  // return sum % 10 === 0;
  return sum % alphabet.length;
}

export function luhnChecksumValidate(
  value: string,
  alphabet = '0123456789',
): number {
  const parity = value.length % 2;

  const sum = value
    .split('')
    .reverse()
    .map(v => alphabet.indexOf(v))
    .reduce((acc, val, idx) => {
      const v = idx % 2 === parity ? val * 2 : val;

      return acc + (v > 9 ? v - 9 : v);
    }, 0);

  // return sum % 10 === 0;
  return sum % alphabet.length;
}

/**
 * Compute the Luhn checksum over the provider number.  The checksum is returned as
 * a Number.  Valid numbers should be equal to 0
 */
export function luhnChecksumValue(
  value: string,
  alphabet = '0123456789',
): number {
  const alen = alphabet.length;

  return value
    .split('')
    .reverse()
    .map(v => alphabet.indexOf(v))
    .reduce((acc, v, idx) => {
      if (idx % 2 === 0) {
        return (acc + v) % alen;
      }

      return (acc + Math.floor((v * 2) / alen) + ((v * 2) % alen)) % alen;
    });
}

/**
 * Compute the checksum digit that should be provided given the alphabet
 *   (e.g. calc_check_digit)
 */
export function luhnChecksumDigit(
  value: string,
  alphabet = '0123456789',
): string {
  const cs = luhnChecksumValue(`${value}${alphabet[0]}`);

  return alphabet[alphabet.length - cs];
}

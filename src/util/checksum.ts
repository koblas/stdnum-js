/**
 * Compute the weighted sum of a string
 */
export function weightedSum(
  value: string,
  {
    alphabet = '0123456789',
    reverse = false,
    weights = [1],
    modulus = 0,
  }: {
    alphabet?: string;
    reverse?: boolean;
    modulus: number;
    weights?: number[];
  },
): number {
  const wlen = weights.length;
  const numbers = value.split('').map(v => alphabet.indexOf(v));
  const weighted = (reverse ? numbers.reverse() : numbers).map(
    (v, idx) => v * weights[idx % wlen],
  );

  return weighted.reduce((acc, v) => {
    let vv = v;
    while (vv < 0) {
      vv += modulus;
    }
    return (acc + vv) % modulus;
  }, 0);
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
): boolean {
  const parity = value.length % 2;

  const sum = value
    .split('')
    // .reverse()
    .map(v => alphabet.indexOf(v))
    .reduce((acc, val, idx) => {
      const v = idx % 2 === parity ? val * 2 : val;

      return acc + (v > 9 ? v - 9 : v);
    }, 0);

  return sum % alphabet.length === 0;
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

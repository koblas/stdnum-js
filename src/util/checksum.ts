/**
 * From stack overflow
 * - Add all digits of a given number
 * - https://stackoverflow.com/questions/38334652/sum-all-the-digits-of-a-number-javascript
 */
function sumAllDigits(value: number) {
  let localValue = value;
  let sum = 0;

  while (localValue) {
    sum += localValue % 10;
    localValue = Math.floor(localValue / 10);
  }

  return sum;
}

/**
 * Compute the weighted sum of a string
 * @param {boolean} sumByDigit - ex) if checksum entry is 18, add 9 (sum of digits) to the sum (instead of 18).
 */
export function weightedSum(
  value: string,
  {
    alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    reverse = false,
    weights = [1],
    modulus = 0,
    sumByDigit = false,
  }: {
    alphabet?: string;
    reverse?: boolean;
    modulus: number;
    weights?: number[];
    sumByDigit?: boolean;
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

    if (sumByDigit && vv > 9) {
      return (acc + sumAllDigits(vv)) % modulus;
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
      let v = val;
      if (idx % 2 === parity) {
        v = val * 2;
        if (v > 9) {
          v -= 9;
        }
      }

      return acc + v;
    }, 0);

  return sum % 10 === 0;
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

  return alphabet[(alphabet.length - cs) % alphabet.length];
}

/*
For more info on the algorithm: http://en.wikipedia.org/wiki/Verhoeff_algorithm
by Sergey Petushkov, 2014
*/

// multiplication table d
const verhoeffD = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
  [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
  [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
  [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
  [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
  [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
  [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
  [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
];

// permutation table p
const verhoeffP = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
  [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
  [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
  [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
  [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
  [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
  [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
];

// inverse table inv
const verhoeffInv = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];

// converts string or number to an array and inverts it
function invArray(array: string): number[] {
  return array
    .split('')
    .map(v => parseInt(v, 10))
    .reverse();
}

// generates checksum
export function verhoeffGenerate(array: string): number {
  const invertedArray = invArray(array);

  const value = invertedArray.reduce(
    (c, v, idx) => verhoeffD[c][verhoeffP[(idx + 1) % 8][v]],
    0,
  );

  return verhoeffInv[value];
}

// validates checksum
export function verhoeffValidate(array: string): boolean {
  const invertedArray = invArray(array);

  const sum = invertedArray.reduce(
    (c, v, idx) => verhoeffD[c][verhoeffP[idx % 8][v]],
    0,
  );

  return sum === 0;
}

// From stackover flow
//   https://stackoverflow.com/questions/929910/modulo-in-javascript-large-number
function modulo(dividentIn: string, divisor: number) {
  let divident = dividentIn;
  const partLength = 10;

  while (divident.length > partLength) {
    const part = divident.substring(0, partLength);
    divident = (parseInt(part, 10) % divisor) + divident.substring(partLength);
  }

  return parseInt(divident, 10) % divisor;
}

/**
 * The ISO 7064 Mod 97, 10 algorithm.
 *
 * The Mod 97, 10 algorithm evaluates the whole number as an integer which is
 * valid if the number modulo 97 is 1. As such it has two check digits.
 */
export function mod97base10Validate(value: string, expect = 1): boolean {
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let fail = false;

  const bigValue = value
    .split('')
    .map(c => {
      const idx = alphabet.indexOf(c);
      if (idx === -1) {
        fail = true;
        return '';
      }
      return String(idx);
    })
    .join('');

  if (fail) {
    return false;
  }

  return modulo(bigValue, 97) === expect;
}

/**
 *  The ISO 7064 Mod 11, 10 algorithm.
 *
 * The Mod 11, 10 algorithm uses a number of calculations modulo 11 and 10 to
 * determine a checksum.
 */
export function mod11mod10Validate(value: string): boolean {
  const sum = value
    .split('')
    .map(v => parseInt(v, 10))
    .reduce((acc, n) => ((((acc === 0 ? 10 : acc) * 2) % 11) + n) % 10, 5);

  return sum === 1;
}

/**
 * National ID Card Number
 *
 * The National ID Card Number is shown on the ID card of the R.O.C., the
 * household certificate, and the passport.
 *
 * A ten-digit code with the first an alphabetic letter followed by a
 * nine-digit numeric string. The alphabetic letter is the area code
 * of the municipality/county/city in which the individual applies
 * for household registration. The leading number represents gender:
 * “1” for males and “2” for females. The last number is a check
 * digit.
 *
 * Note: NATID and UI only differ by gender coding
 *
 * Sources:
 *   https://www.mof.gov.tw/Eng/download/16968
 *   https://en.wikipedia.org/wiki/National_identification_card_(Taiwan)
 *
 * PERSON
 */

import { ValidateReturn } from '../types';
import * as exceptions from '../exceptions';
import { strings, weightedSum } from '../util';

function clean(input: string) {
  return strings.cleanUnicode(input, ' -');
}

// ID Encoding alphabet
//
// A: 10    B: 11    C: 12    D: 13    E: 14    F: 15    G: 16    H: 17    I: 34
// J: 18    K: 19    L: 20    M: 21    N: 22    O: 35    P: 23    Q: 24    R: 25
// S: 26    T: 27    U: 28    V: 29    W: 32    X: 30    Y: 31    Z: 33
//
export const ALPHABET = '0123456789ABCDEFGHJKLMNPQRSTUVXYWZIO';

const impl = {
  localName: '中華民國國民身分證',
  abbreviation: 'NATID',
  name: 'National ID Number',

  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return value;
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 10) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    const [issuer, gender, code, check] = strings.splitAt(value, 1, 2, 9);

    if (!strings.isalpha(issuer)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (!['1', '2'].includes(gender)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (!strings.isdigits(code)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (!strings.isdigits(check)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const sum = weightedSum(value, {
      weights: [1, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      alphabet: ALPHABET,
      modulus: 10,
    });
    if (sum % 10 !== 0) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: true,
      isCompany: false,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;
export default impl;

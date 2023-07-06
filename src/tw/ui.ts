/**
 * UI Number
 *
 * The UI Number is shown on the “R.O.C. (Taiwan) Resident Certificate,” “Exit &
 * Entry Permit Taiwan Republic of China,” or the “R.O.C. (Taiwan) UI No. Basic
 * Information Form.”
 *
 * The UI Number issued by January 1, 2021 was a ten-digit code with
 * two alphabetic letters followed by an eight-digit numeric string.
 * The first alphabetic letter is the area code of the
 * municipality/county/city by which the UI Number was issued. The
 * second alphabetic letter represents gender: “A” or “C” for males,
 * and “B” or “D” for females. The last number is a check digit. This
 * kind of UI Number will be invalidated from January 1, 2031. The UI
 * Number issued from January 2, 2021 is a ten-digit code with the
 * first an alphabetic letter followed by a nine-digit numeric string.
 * The alphabetic letter is the area code of the municipality/county/city
 * by which the UI Number was issued. The leading number represents
 * gender: “8” for males and “9” for females. The last number is a
 * check digit.
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
import { ALPHABET } from './natid';

function clean(input: string) {
  return strings.cleanUnicode(input, ' -');
}

// const OLD_FMT = /^[A-Z][ABCD]\d{8}$/;
// const NEW_FMT = /^[A-Z][89]\d{8}$/;

const impl = {
  name: 'UI Number',
  localName: '中華民國國民身分證',
  abbreviation: 'UI',

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
    if (!['A', 'B', 'C', 'D', '8', '9'].includes(gender)) {
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

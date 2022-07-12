/**
 *
 * CBU (Clave Bancaria Uniforme, Argentine bank account number).
 *
 * CBU it s a code of the Banks of Argentina to identify customer accounts. The
 * number consists of 22 digits and consists of a 3 digit bank identifier,
 * followed by a 4 digit branch identifier, a check digit, a 13 digit account
 * identifier and another check digit.
 *
 * Sources:
 *   https://es.wikipedia.org/wiki/Clave_Bancaria_Uniforme
 *
 * BANK
 */

import * as exceptions from '../exceptions';
import { ValidateReturn, Validator } from '../types';
import { strings, weightedSum } from '../util';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const impl: Validator = {
  name: 'Single Banking Code',
  localName: 'Clave Bancaria Uniforme',
  abbreviation: 'CBU',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);
    const [a, b] = strings.splitAt(value, 8);

    return `${a} ${b}`;
  },

  /**
   * Check if the number is a valid Argentinian CBU number.
   * This checks the length, formatting and other contraints. It does not check
   * for control letter.
   */
  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 22) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const [front, c1, back, c2] = strings.splitAt(value, 7, 8, 21);

    const s1 = String(
      10 -
        weightedSum(front, {
          reverse: true,
          weights: [3, 1, 7, 9, 3, 1, 7],
          modulus: 10,
        }),
    );
    const s2 = String(
      10 -
        weightedSum(back, {
          reverse: true,
          weights: [3, 1, 7, 9, 3, 1, 7, 9, 3, 1, 7, 9, 3, 1],
          modulus: 10,
        }),
    );

    if (s1 !== c1 || s2 !== c2) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: false,
      isCompany: false,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

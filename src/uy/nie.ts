/**
 * NIE (Uruguay Foreigners Identification Number Número de Identidad de Extranjero).
 *
 * This number is formed by 9 digits, with the following definition:
 *   - 9NNNNNNN: is formed by eight digits containing a unique number.
 *   - D: is formed by one digit containing the verification digit for the full number.
 *
 * NOTE: Unable to find a checksum algorithm, assuming it's the same as Cedula
 *
 * Source
 *    https://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/Uruguay-TIN.pdf
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings, weightedSum } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const impl: Validator = {
  name: 'Uruguayan Foreigners Identification Number',
  localName: 'Número de Identidad de Extranjero',
  abbreviation: 'NIE',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    const [a, b, c, d] = strings.splitAt(value, 2, 5, 8);

    return `${a}.${b}.${c}-${d}`;
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 9) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [front, check] = strings.splitAt(value, 8);

    const digit = String(
      (11 -
        weightedSum(front, {
          weights: [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
          modulus: 11,
        })) %
        10,
    );

    if (check !== digit) {
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

/**
 * Vergi identifikasiya nömrəsi (VÖEN) - Azerbaijani Tax Identification Number
 *
 * The number consists of 10 digits. The first two digits are the code of the
 * territorial administrative unit, followed by a six digit serial number, a
 * check digit, and a final digit for the legal status (1 for legal persons,
 * 2 for natural persons).
 *
 * Source
 *   https://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/Azerbaijan-TIN.pdf
 *   https://www.currentschoolnews.com/az/articles/tax-identification-number-application/
 *   https://github.com/arthurdejong/python-stdnum/blob/master/stdnum/az/voen.py (check digit weights)
 *
 * PERSON/ENTITY
 */

import * as exceptions from '../exceptions';
import { strings, weightedSum } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const impl: Validator = {
  name: 'Azerbaijani Tax Identification Number',
  localName: 'Vergi Identifikasiya Nömrəsi',
  abbreviation: 'VÖEN',
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

    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const last = value[9];
    if (!['1', '2'].includes(last)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    // A sum of 10 has no valid check digit
    const sum = weightedSum(value.slice(0, 8), {
      weights: [4, 1, 8, 6, 2, 7, 5, 3],
      modulus: 11,
    });
    if (String(sum) !== value[8]) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: last === '2',
      isCompany: last === '1',
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

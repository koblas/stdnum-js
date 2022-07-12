/**
 * Kennitala (Icelandic personal and organisation identity code).
 *
 * Module for handling Icelandic personal and organisation identity codes
 * (kennitala).
 *
 * PERSON/ENTITY
 */

import * as exceptions from '../exceptions';
import { isValidDateCompactYYYYMMDD, strings, weightedSum } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const impl: Validator = {
  name: 'Icelandic Identity Code',
  localName: 'Kennitala',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 6).join('-');
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

    const [dd, mm, yy, , centry] = strings.splitAt(value, 2, 4, 6, 9);

    const dayValue = parseInt(dd, 10);
    const isOrg = dayValue > 40;
    const day = dayValue > 40 ? String(dayValue - 40).padStart(2, '0') : dd;
    const year = centry === '9' ? `19${yy}` : `20${yy}`;

    if (!isValidDateCompactYYYYMMDD(`${year}${mm}${day}`)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const sum = weightedSum(value, {
      modulus: 11,
      weights: [3, 2, 7, 6, 5, 4, 3, 2, 1, 0],
    });

    if (sum !== 0) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: !isOrg,
      isCompany: isOrg,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

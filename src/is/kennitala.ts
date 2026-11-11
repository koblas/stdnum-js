/**
 * Kennitala (Icelandic personal and organisation identity code).
 *
 * Module for handling Icelandic personal and organisation identity codes
 * (kennitala).
 *
 * The number is DDMMYY (40 is added to the day for organisations), two
 * random digits, a check digit and a century digit (9 for 1900-1999, 0 for
 * 2000-2099).
 *
 * Source
 *   https://en.wikipedia.org/wiki/Icelandic_identification_number
 *   https://github.com/arthurdejong/python-stdnum/blob/master/stdnum/is_/kennitala.py
 *
 * PERSON/ENTITY
 */

import * as exceptions from '../exceptions';
import { isValidDate, strings, weightedSum } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const impl: Validator = {
  name: 'Icelandic Identity Code',
  localName: 'Kennitala',
  examples: ['4504013150'],
  formats: ['nnnnnn-nnnn'],
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
    // The last digit is the century: 9 for the 1900s, 0 for the 2000s
    if (centry !== '9' && centry !== '0') {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const dayValue = parseInt(dd, 10);
    const isOrg = dayValue > 40;
    const day = dayValue > 40 ? String(dayValue - 40).padStart(2, '0') : dd;
    const year = centry === '9' ? `19${yy}` : `20${yy}`;

    if (!isValidDate(year, mm, day)) {
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

export const {
  name,
  localName,
  abbreviation,
  examples,
  formats,
  validate,
  format,
  compact,
} = impl;

/**
 * CNP (Cod Numeric Personal, Romanian Numerical Personal Code).
 *
 * The CNP is a 13 digit number that includes information on the person's
 * gender, birth date and country zone.
 *
 * Source:
 * https://ro.wikipedia.org/wiki/Cod_numeric_personal
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { isValidDateCompactYYYYMMDD, strings, weightedSum } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const century = {
  '0': '19', // shouldn't happen,
  '1': '19',
  '2': '19',
  '3': '18',
  '4': '18',
  '5': '20',
  '6': '20',
  '7': '19',
  '8': '19',
  '9': '19',
};

function checkDate(value: string): boolean {
  const [first, dvalue] = strings.splitAt(value, 1, 7);

  return isValidDateCompactYYYYMMDD(`${century[first]}${dvalue}`);
}

const impl: Validator = {
  name: 'Romanian Numerical Personal Code',
  localName: 'Cod Numeric Personal',
  abbreviation: 'CNP',
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
    if (value.length !== 13) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    if (value[0] === '0') {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    if (!checkDate(value)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const [front, check] = strings.splitAt(value, -1);
    const sum = weightedSum(front, {
      weights: [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9],
      modulus: 11,
    });

    const digit = sum === 10 ? '1' : String(sum);

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

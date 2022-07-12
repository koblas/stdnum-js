/**
 * COE (Codice operatore economico, San Marino national tax number).
 *
 * The COE is a tax identification number of up to 5-digits used in San Marino.
 * Leading zeroes are commonly dropped.
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

// All small valued registered entities
const lowNumbers = new Set([
  2, 4, 6, 7, 8, 9, 10, 11, 13, 16, 18, 19, 20, 21, 25, 26, 30, 32, 33, 35, 36,
  37, 38, 39, 40, 42, 45, 47, 49, 51, 52, 55, 56, 57, 58, 59, 61, 62, 64, 65,
  66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 79, 80, 81, 84, 85, 87, 88, 91,
  92, 94, 95, 96, 97, 99,
]);

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  const [value, err] = strings.cleanUnicode(input, ' .');

  if (err) {
    return [value, err];
  }

  return [value.replace(/^0+/, ''), null];
}

const impl: Validator = {
  name: 'San Marino National Tax Number',
  localName: 'Codice Operatore Eeconomico',
  abbreviation: 'COE',

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
    if (value.length > 5 || value.length === 0) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    if (value.length < 3 && !lowNumbers.has(parseInt(value, 10))) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: false,
      isCompany: true,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

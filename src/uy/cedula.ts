/**
 * Cedula (Uruguayan Identity Card Number).
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings, weightedSum } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -/');
}

const impl: Validator = {
  name: 'Uruguayan Identity Card Number',
  localName: 'Cédula de Identidad',
  abbreviation: 'CI',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  // 9dddddddd
  // 123456789

  format(input: string): string {
    const [value] = clean(input);

    const [a, b, c, d] = strings.splitAt(value, 1, 4, 7);

    return `${a}.${b}.${c}-${d}`;
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 8) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [front, check] = strings.splitAt(value, 7);

    const sum = weightedSum(front, {
      weights: [2, 9, 8, 7, 6, 3, 4],
      modulus: 10,
    });

    if (check !== String((10 - sum) % 10)) {
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

/**
 *
 * Chile RUT/RUN numbers
 *
 * RUT number (Rol Unico Tributario).
 *
 * The RUT, the Chilean national tax number is the same as the RUN (Rol Único
 * Nacional) the Chilean national identification number. The number consists of
 * 8 digits, followed by a check digit.
 *
 * PERSON/ENTITY
 */

import * as exceptions from '../exceptions';
import { strings, weightedSum } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  const [v, err] = strings.cleanUnicode(input, ' -');

  if (err) {
    return ['', err];
  }

  if (v.startsWith('CL')) {
    return [v.substr(2), null];
  }

  return [v, null];
}

const impl: Validator = {
  name: 'Chilean National Tax Number',
  localName: 'Rol Único Tributario ',
  abbreviation: 'RUT',
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

  /**
   * Check if the number is a valid RUT number.
   * This checks the length, formatting and other contraints. It does not check
   * for control letter.
   */
  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 8 && value.length !== 9) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    const [front, check] = strings.splitAt(value, value.length - 1);

    if (!strings.isdigits(front)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const sum = weightedSum(front, {
      reverse: true,
      weights: [9, 8, 7, 6, 5, 4, 9, 8, 7],
      modulus: 11,
    });

    const digit = '0123456789K'[sum];

    if (check !== digit) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: true,
      isCompany: true,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

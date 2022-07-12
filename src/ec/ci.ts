/**
 * CI (Cédula de identidad, Ecuadorian personal identity code).
 *
 * The CI is a 10 digit number used to identify Ecuadorian citizens.
 *
 * Source
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

export function validPrefix(value: string): boolean {
  const prefix = parseInt(value.substr(0, 2), 10);
  if (prefix === 0 || prefix > 24 || prefix === 30 || prefix === 50) {
    // Invalid province
    return false;
  }

  return true;
}

const impl: Validator = {
  name: 'Ecuadorian Personal Identity Code',
  localName: 'Cédula de Identidad',
  abbreviation: 'CI',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 9).join('-');
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

    if (!validPrefix(value)) {
      // Invalid province
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (parseInt(value[2], 10) > 6) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const digit =
      value
        .split('')
        .map(v => parseInt(v, 10))
        .map((v, idx) => (idx % 2 === 0 ? v * 2 : v))
        .map(v => (v > 9 ? v - 9 : v))
        .reduce((acc, v) => acc + v) % 10;

    if (digit !== 0) {
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

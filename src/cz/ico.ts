/**
 * IČO (Identifikační číslo osoby, Czech Company Identification Number).
 *
 * The IČO is an 8-digit identifier assigned to every business entity
 * registered in the Czech Republic. It uses a weighted modulus-11 checksum.
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings, weightedSum } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./');
}

function checksum(value: string): boolean {
  const [front, check] = strings.splitAt(value, -1);

  const sum = weightedSum(front, {
    modulus: 11,
    weights: [8, 7, 6, 5, 4, 3, 2, 1],
  });

  const v = (11 - sum) % 11;

  return (v === 0 ? '1' : String(v % 10)) === check;
}

const impl: Validator = {
  name: 'Czech Company Identification Number',
  localName: 'Identifikační číslo osoby',
  abbreviation: 'IČO',

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
    if (value.length !== 8) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    if (value.startsWith('9')) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (!checksum(value)) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
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

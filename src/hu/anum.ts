/**
 * ANUM (Közösségi adószám, Hungarian VAT number).
 *
 * The ANUM is the Hungarian VAT (Közösségi adószám) number. It is an 8-digit
 * taxpayer registration number that includes a weighted checksum.
 *
 * PERSON/ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { weightedSum } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -', 'HU');
}

const impl: Validator = {
  name: 'Hugarian VAT Number',

  localizedName: 'Közösségi adószám',

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

    const sum = weightedSum(value, {
      modulus: 10,
      weights: [9, 7, 3, 1, 9, 7, 3, 1],
    });

    if (sum !== 0) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: false,
      isEntity: false,
    };
  },
};

export const { name, localizedName, validate, format, compact } = impl;

/**
 * XYZZY (description).
 *
 * DESCRIPTION
 *
 * Source
 *   HERE
 *
 * ENTITY/PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { weightedSum } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

// const validRe = /^[PCGQV]{1}00[A-Z0-9]{8}$/;

// const ALPHABET = '0123456789X';

const impl: Validator = {
  name: 'NAME',
  localName: 'NAME',
  abbreviation: '{{tincode_upper}}',

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
    if (value.length !== 11) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    // if (!validRe.test(value)) {
    //   return { isValid: false, error: new exceptions.InvalidFormat() };
    // }

    const [, front, check] = strings.splitAt(value, 1, 10);

    const sum = weightedSum(front, {
      weights: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      modulus: 11,
    });

    // if (ALPHABET[sum] !== check) {
    //   return { isValid: false, error: new exceptions.InvalidChecksum() };
    // }

    return {
      isValid: true,
      compact: value,
      isIndividual: value[0] === 'P',
      isCompany: value[0] !== 'P',
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

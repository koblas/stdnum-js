/**
 * IDNO (Moldavian company identification number).
 *
 * The IDNO is used in Moldavia as unique identifier for legal entities. The
 * number consists of 13 digits. The first digit identifies the registry,
 * followed by three digits for the year the code was assigned. The number ends
 * with five identifier digits and a check digit.
 *
 * Source
 *    https://www.idno.md
 *    https://kls.md/paves-the-way-for-an-eventual-merger/
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { weightedSum } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -/');
}

const impl: Validator = {
  name: 'Moldavian Company Identification Number',
  localName: 'Unique State Identification Number',
  abbreviation: 'IDNO',
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

    const [front, check] = strings.splitAt(value, -1);

    const sum = weightedSum(front, {
      weights: [7, 3, 1, 7, 3, 1, 7, 3, 1, 7, 3, 1],
      modulus: 10,
    });
    if (String(sum) !== check) {
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

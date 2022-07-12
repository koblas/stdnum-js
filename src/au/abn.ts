/**
 * ABN (Australian Business Number).
 *
 * The Australian Business Number (ABN) is an identifier issued to entities
 * registered in the Australian Business Register (ABR). The number consists of
 * 11 digits of which the first two are check digits.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Australian_Business_Number
 *   https://abr.business.gov.au/
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { weightedSum } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' ');
}

const impl: Validator = {
  name: 'Australian Business Number',
  localName: 'Business Number',
  abbreviation: 'ABN',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 2, 5, 8).join(' ');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 11) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [check, rest] = strings.splitAt(value, 2);

    const sum = weightedSum(rest, {
      weights: [3, 5, 7, 9, 11, 13, 15, 17, 19],
      modulus: 89,
    });

    if (check !== String(11 + ((177 - sum) % 89))) {
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

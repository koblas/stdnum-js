/**
 * UTR (United Kingdom Unique Taxpayer Reference).
 *
 * A UTR (unique taxpayer reference) is a 10 digit number used to identify UK
 * taxpayers who have to submit a tax return.
 *
 * Source
 *    https://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/UK-TIN.pdf
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { weightedSum } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' ');
}

const impl: Validator = {
  name: 'United Kingdom Unique Taxpayer Reference',
  localName: 'Unique Taxpayer Reference',
  abbreviation: 'UTR',

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
    if (value.length !== 10) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [check, back] = strings.splitAt(value, 1);
    const sum = weightedSum(back, {
      weights: [6, 7, 8, 9, 10, 5, 4, 3, 2],
      modulus: 11,
    });
    const digit = '21987654321'[sum];
    if (digit !== check) {
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

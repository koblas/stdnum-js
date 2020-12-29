/**
 * IRD number (New Zealand Inland Revenue Department (Te Tari Tāke) number).
 *
 * The IRD number is used by the New Zealand Inland Revenue Department (Te Tari
 * Tāke in Māori) to identify businesses and individuals for tax purposes. The
 * number consists of 8 or 9 digits where the last digit is a check digit.
 *
 * Source
 *   https://www.ird.govt.nz/
 *   https://www.ird.govt.nz/-/media/Project/IR/PDF/2020RWTNRWTSpecificationDocumentv10.pdf
 *   https://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/New%20Zealand-TIN.pdf
 *
 * PERSON/ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { weightedSum } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  const [value, err] = strings.cleanUnicode(input, ' -');

  if (err !== null) {
    return [value, err];
  }

  if (value.startsWith('NZ')) {
    return [value.substr(2), null];
  }

  return [value, null];
}

const impl: Validator = {
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 2, 5).join('-');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 8 && value.length !== 9) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [frontV, check] = strings.splitAt(value, -1);
    const front = frontV.padStart(8, '0');

    let sum =
      (11 -
        weightedSum(front, {
          weights: [3, 2, 7, 6, 5, 4, 3, 2],
          modulus: 11,
        })) %
      11;
    if (sum === 10) {
      sum =
        (11 -
          weightedSum(front, {
            weights: [7, 4, 3, 2, 5, 2, 7, 6],
            modulus: 11,
          })) %
        11;
    }

    if (String(sum) !== check) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: false,
      isCompany: false,
    };
  },
};

export const { validate, format, compact } = impl;

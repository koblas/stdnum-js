/**
 * CNIC (Pakastan Computerize National Identiy Card)
 *
 * Pakastan National Identification Number (CNIC) is issued to individuals and legal entities for
 * tax purposes. The number consists of 11 digits.
 *
 * Source
 *    https://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/Pakistan-TIN.pdf
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
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

    return strings.splitAt(value, 5, 12).join('-');
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

    if (!'1234567'.includes(value[0])) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    // if (value[12] === '0') {
    //   return { isValid: false, error: new exceptions.InvalidComponent() };
    // }

    return {
      isValid: true,
      compact: value,
      isIndividual: true,
      isCompany: false,
    };
  },
};

export const { validate, format, compact } = impl;

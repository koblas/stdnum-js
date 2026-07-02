/**
 * Vietnamese Passport Number (Hộ chiếu Việt Nam).
 *
 * Format: Modern machine-readable passport: one letter prefix (e.g. B, C, N, P) followed by 7 digits (e.g. C1234567). Older serials were 9 all-numeric digits.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Vietnamese_passport
 *   https://danskebank.fi/-/media/pdf/danske-bank/fi/en/national-identifier-list-final.pdf
 *   https://giacorp.vn/en/new/what-is-passport.html
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^([A-Z]\d{7}|\d{9})$/;

const impl: Validator = {
  name: 'Vietnamese Passport Number',
  localName: 'Hộ chiếu Việt Nam',
  abbreviation: 'Passport',

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

    if (value.length < 8 || value.length > 9) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    const match = value.match(idRegexp);
    if (!match) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
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

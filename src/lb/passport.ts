/**
 * Lebanese Passport Number (جواز سفر لبناني).
 *
 * Format: Modern biometric/machine-readable passports: two letters (LR for biometric, RL for the older navy-blue machine-readable series) followed by seven digits (9 chars, e.g. LR1234567). Older passports: a 6- or 7-digit number with no prefix.
 *
 * Source
 *   https://danskebank.fi/-/media/pdf/danske-bank/fi/en/national-identifier-list-final.pdf
 *   https://en.wikipedia.org/wiki/Lebanese_passport
 *   https://www.general-security.gov.lb/en/posts/11
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]{2}\d{7}$|^\d{6,7}$/;

const impl: Validator = {
  name: 'Lebanese Passport Number',
  localName: 'جواز سفر لبناني',
  abbreviation: 'PASSPORT',

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

    if (value.length < 6 || value.length > 9 || value.length === 8) {
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

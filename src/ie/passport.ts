/**
 * Irish Passport Number (Passeport Éireannach).
 *
 * Format: Two characters that may each be a letter or digit, followed by seven digits, no spaces or delimiters (9 characters total).
 *
 * Source
 *   https://learn.microsoft.com/en-us/purview/sit-defn-ireland-passport-number
 *   https://en.wikipedia.org/wiki/Irish_passport
 *   https://www.ireland.ie/en/dfa/passports/faqs/
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z0-9]{2}\d{7}$/;

const impl: Validator = {
  name: 'Irish Passport Number',
  localName: 'Passeport Éireannach',
  abbreviation: 'Passport',
  examples: ['PA1234567'],
  formats: ['ccnnnnnnn'],

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

    if (value.length !== 9) {
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

export const {
  name,
  localName,
  abbreviation,
  examples,
  formats,
  validate,
  format,
  compact,
} = impl;

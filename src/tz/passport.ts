/**
 * Tanzanian Passport Number (Pasipoti ya Tanzania).
 *
 * Format: Two commonly documented forms: a letter + 7 digits (older 5-year passport, e.g. A1234567) and 2 letters + 6 digits (10-year passport, e.g. AB123456). Both are 8 characters total.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Tanzanian_passport
 *   https://www.refworld.org/docid/57dfa00c4.html
 *   https://knowledge.broadcom.com/external/article/159954/detect-passport-numbers-for-one-or-more.html
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]\d{7}$|^[A-Z]{2}\d{6}$/;

const impl: Validator = {
  name: 'Tanzanian Passport Number',
  localName: 'Pasipoti ya Tanzania',
  abbreviation: 'PASSPORT',
  examples: ['A1234567', 'AB123456'],
  formats: ['acnnnnnn'],

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

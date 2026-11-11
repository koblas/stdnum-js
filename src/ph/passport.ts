/**
 * Philippine Passport Number (Pilipinas passport).
 *
 * Format: Philippine passport numbers have evolved through several formats: brown passports = 1 letter + 6 digits; green pre-2005 = 2 letters + 6 digits; 2005 to Aug 2016 (machine-readable/early biometric) = 2 letters + 7 digits; post-Aug 15 2016 e-passports = 1 letter + 7 digits + 1 trailing letter. Microsoft Purview's pattern matches all four. Total length ranges 7 to 9 characters.
 *
 * Source
 *   https://learn.microsoft.com/en-us/purview/sit-defn-philippines-passport-number
 *   https://en.wikipedia.org/wiki/Philippine_passport
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^([A-Z]\d{6}|[A-Z]{2}\d{6}|[A-Z]{2}\d{7}|[A-Z]\d{7}[A-Z])$/;

const impl: Validator = {
  name: 'Philippine Passport Number',
  localName: 'Pilipinas passport',
  abbreviation: 'PASSPORT',
  examples: ['AB1234567', 'A1234567B'],
  formats: ['acnnnnnnc', 'aannnnnn', 'annnnnn'],

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

    if (value.length < 7 || value.length > 9) {
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

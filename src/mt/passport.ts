/**
 * Maltese Passport Number (Passaport Malti).
 *
 * Format: Seven digits, no letters, no checksum.
 *
 * Source
 *   https://learn.microsoft.com/en-us/purview/sit-defn-malta-passport-number
 *   https://en.wikipedia.org/wiki/Maltese_passport
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^\d{7}$/;

const impl: Validator = {
  name: 'Maltese Passport Number',
  localName: 'Passaport Malti',
  abbreviation: 'Passport',
  examples: ['1234567'],
  formats: ['nnnnnnn'],

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

    if (value.length !== 7) {
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

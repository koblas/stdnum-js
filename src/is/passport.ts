/**
 * Icelandic Passport Number (Íslenskt vegabref).
 *
 * Format: Guessed format: letter 'A' followed by seven digits. NOT confirmed by any authoritative source.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Icelandic_passport
 *   https://www.skra.is/english/people/passport-and-id-card/passport/various-information-on-passports/about-the-passport/
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^A\d{7}$/;

const impl: Validator = {
  name: 'Icelandic Passport Number',
  localName: 'Íslenskt vegabref',
  abbreviation: 'Passport',
  examples: ['A1234567'],
  formats: ['Annnnnnn'],

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

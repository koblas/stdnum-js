/**
 * Armenian Passport Number (Հայաստան անձնագիր).
 *
 * Format: Armenian biometric (ordinary) passport number: typically two uppercase letters (commonly the 'AN' prefix for ordinary passports) followed by seven digits. The MRZ document-number field is 9 alphanumeric characters, consistent with a 2-letter + 7-digit serial.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Armenian_passport
 *   https://travel.state.gov/content/travel/en/us-visas/Visa-Reciprocity-and-Civil-Documents-by-Country/Armenia.html
 *   https://trustdochub.com/en/product/armenian-passport-validity/
 *   https://www.mfa.am/en/passport/
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]{2}\d{7}$/;

const impl: Validator = {
  name: 'Armenian Passport Number',
  localName: 'Հայաստան անձնագիր',
  abbreviation: 'PASSPORT',
  examples: ['AN1234567'],
  formats: ['aannnnnnn'],

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

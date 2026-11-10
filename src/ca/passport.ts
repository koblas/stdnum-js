/**
 * Canadian Passport Number (Passeport canadien).
 *
 * Format: Older/standard format is two uppercase letters followed by six digits (e.g. AB123456, 8 chars). Newer passports (next-generation series) use one letter, six digits, then two letters (e.g. A123456BC, 9 chars). Both forms are in circulation and valid.
 *
 * Source
 *   https://learn.microsoft.com/en-us/purview/sit-defn-canada-passport-number
 *   https://en.wikipedia.org/wiki/Canadian_passport
 *   https://github.com/validatorjs/validator.js/issues/2525
 *   https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/new-passport-features.html
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

// Support both old (2 letters + 6 digits) and new (1 letter + 6 digits + 2 letters) formats
const idRegexp = /^[A-Z]{2}\d{6}$|^[A-Z]\d{6}[A-Z]{2}$/;

const impl: Validator = {
  name: 'Canadian Passport Number',
  localName: 'Passeport canadien',
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

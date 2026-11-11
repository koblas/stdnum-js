/**
 * Mongolian Passport Number (Монголын паспорты).
 *
 * Format: Mongolian passport number is a 9-character alphanumeric serial: two uppercase letters followed by 7 digits (e.g. AB1234567). This matches the project's current regex.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Mongolian_passport
 *   https://www.passportindex.org/passport/mongolia/
 *   https://www.consilium.europa.eu/prado/en/prado-documents/mng/a/d/docs-per-type.html
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
  name: 'Mongolian Passport Number',
  localName: 'Монголын паспорты',
  abbreviation: 'PASSPORT',
  examples: ['AB1234567'],
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

/**
 * Faroe Islands Passport Number (Føroyskt pass).
 *
 * Format: Nine digits, no letters (Faroe Islands holders carry Danish passports, which use a nine-digit numeric serial).
 *
 * Source
 *   https://learn.microsoft.com/en-us/purview/sit-defn-denmark-passport-number
 *   https://en.wikipedia.org/wiki/Danish_passport
 *   https://www.consilium.europa.eu/prado/en/FRO-A-0/index.html
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^\d{9}$/;

const impl: Validator = {
  name: 'Faroe Islands Passport Number',
  localName: 'Føroyskt pass',
  abbreviation: 'Passport',
  examples: ['123456789'],
  formats: ['nnnnnnnnn'],

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

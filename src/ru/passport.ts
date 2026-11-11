/**
 * Russian Passport Number (Российский паспорт).
 *
 * Format: Russian international (foreign-travel / zagranichny) passport number: a nine-digit number, typically written as two digits + space/hyphen + seven digits (e.g. '12 3456789'). After removing spaces/dashes it is 9 consecutive digits. No letters.
 *
 * Source
 *   https://learn.microsoft.com/en-us/purview/sit-defn-russia-passport-number-international
 *   https://en.wikipedia.org/wiki/Russian_passport
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
  name: 'Russian Passport Number',
  localName: 'Российский паспорт',
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

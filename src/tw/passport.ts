/**
 * Taiwanese Passport Number (中華民國護照).
 *
 * Format: Nine digits, no letters. Biometric (e-)passports issued since 2008 begin with the digit 3; non-biometric ordinary passports are nine digits without that constraint. ^\d{9}$ covers both.
 *
 * Source
 *   https://learn.microsoft.com/en-us/purview/sit-defn-taiwan-passport-number
 *   https://en.wikipedia.org/wiki/Taiwan_passport
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
  name: 'Taiwanese Passport Number',
  localName: '中華民國護照',
  abbreviation: 'Passport',
  examples: ['312345678'],
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

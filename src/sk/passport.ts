/**
 * Slovak Passport Number (Slovenský pas).
 *
 * Format: Eight or nine character alphanumeric: one letter followed by seven digits, OR two letters followed by six or seven digits.
 *
 * Source
 *   https://learn.microsoft.com/en-us/purview/sit-defn-slovakia-passport-number
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^([A-Z]\d{7}|[A-Z]{2}\d{6,7})$/;

const impl: Validator = {
  name: 'Slovak Passport Number',
  localName: 'Slovenský pas',
  abbreviation: 'Passport',
  examples: ['A1234567', 'AB123456'],
  formats: ['acnnnnnn', 'aannnnnnn'],

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

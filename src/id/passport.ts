/**
 * Indonesian Passport Number (Paspor Indonesia).
 *
 * Format: One or two uppercase letters followed by six or seven digits (7 to 9 alphanumeric characters total), no spaces or delimiters.
 *
 * Source
 *   https://learn.microsoft.com/en-us/purview/sit-defn-indonesia-passport-number
 *   https://en.wikipedia.org/wiki/Indonesian_passport
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]{1,2}\d{6,7}$/;

const impl: Validator = {
  name: 'Indonesian Passport Number',
  localName: 'Paspor Indonesia',
  abbreviation: 'Passport',
  examples: ['A123456', 'AB1234567'],
  formats: ['annnnnn', 'aannnnnnn', 'acnnnnnn'],

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

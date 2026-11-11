/**
 * Czech Passport Number (Cestovní pas).
 *
 * Format: Eight digits without spaces or delimiters (per Microsoft Purview Czech passport SIT).
 *
 * Source
 *   https://learn.microsoft.com/en-us/purview/sit-defn-czech-passport-number
 *   https://en.wikipedia.org/wiki/Czech_passport
 *   https://www.consilium.europa.eu/prado/en/CZE-AO-04001/index.html
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^\d{8}$/;

const impl: Validator = {
  name: 'Czech Passport Number',
  localName: 'Cestovní pas',
  abbreviation: 'Passport',
  examples: ['12345678'],
  formats: ['nnnnnnnn'],

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

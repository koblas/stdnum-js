/**
 * Estonian Passport Number (Eesti pass).
 *
 * Format: Estonian passport number: two-letter prefix followed by seven digits (e.g. KG1234567) for documents issued since 16 March 2026 (PPA notice 15.1-1/2-1 of 20.02.2026); older passports use one letter followed by seven digits (e.g. K1234567).
 *
 * Source
 *   https://www.politsei.ee/en
 *   https://learn.microsoft.com/en-us/purview/sit-defn-estonia-passport-number
 *   https://en.wikipedia.org/wiki/Estonian_passport
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]{1,2}\d{7}$/;

const impl: Validator = {
  name: 'Estonian Passport Number',
  localName: 'Eesti pass',
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

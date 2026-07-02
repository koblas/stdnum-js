/**
 * Austrian Passport Number (Reisepass).
 *
 * Format: One letter followed by seven digits (e.g. on the data page, often printed with an optional space: 'A 1234567').
 *
 * Source
 *   https://learn.microsoft.com/en-us/purview/sit-defn-austria-passport-number
 *   https://genrocket.freshdesk.com/support/solutions/articles/19000119829-how-do-i-use-the-austriapassportnumbergen-generator-
 *   https://en.wikipedia.org/wiki/Austrian_passport
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]\d{7}$/;

const impl: Validator = {
  name: 'Austrian Passport Number',
  localName: 'Reisepass',
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

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

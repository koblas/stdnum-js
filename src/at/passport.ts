/**
 * Austrian Passport Number (Reisepass).
 *
 * Format: Austrian passport number: two letters followed by seven digits (e.g. AP1234567) for passports issued since 1 December 2023; older passports use one letter followed by seven digits (e.g. A1234567).
 *
 * Source
 *   https://www.wien.gv.at/politik/wahlkartenantraege-hinweise-dokumentnummern
 *   https://www.check-at.gv.at/documents/P10
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

const idRegexp = /^[A-Z]{1,2}\d{7}$/;

const impl: Validator = {
  name: 'Austrian Passport Number',
  localName: 'Reisepass',
  abbreviation: 'Passport',
  examples: ['A1234567', 'AP1234567'],
  formats: ['annnnnnn', 'aannnnnnn'],

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

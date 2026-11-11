/**
 * Yemeni Passport Number (جواز سفر يمني).
 *
 * Format: 8 digits (numeric serial). No authoritative published spec for the Yemeni passport number layout was found.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Yemeni_passport
 *   https://travel.state.gov/content/travel/en/us-visas/Visa-Reciprocity-and-Civil-Documents-by-Country/Yemen.html
 *   https://maskat.diplo.de/blob/2238358/5f7c4a50ec45ff0861b5ed2a650a8eac/information-yemeni-passports-data.pdf
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
  name: 'Yemeni Passport Number',
  localName: 'جواز سفر يمني',
  abbreviation: 'PASSPORT',
  examples: ['01234567'],
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

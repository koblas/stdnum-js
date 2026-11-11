/**
 * Ivorian Passport Number (Passeport ivoirien).
 *
 * Format: Two uppercase letters followed by six digits (e.g. AB123456). This is the project's existing guess; no authoritative source confirming the passport serial format was found.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Ivorian_passport
 *   https://www.consilium.europa.eu/prado/en/prado-documents/civ/a/docs-per-category.html
 *   https://ci.usembassy.gov/passports/important-passport-information/
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]{2}\d{6}$/;

const impl: Validator = {
  name: 'Ivorian Passport Number',
  localName: 'Passeport ivoirien',
  abbreviation: 'PASSPORT',
  examples: ['AB123456'],
  formats: ['aannnnnn'],

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

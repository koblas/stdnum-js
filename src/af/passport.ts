/**
 * Afghan Passport Number (د تذکره افغانستان).
 *
 * Format: One uppercase letter followed by 8 digits (9 alphanumeric characters total). The leading letter is 'O' on older ordinary passports and 'P' on passports issued in Afghanistan since January 2018; consular offices may still issue 'O' versions.
 *
 * Source
 *   https://www.consilium.europa.eu/prado/en/prado-documents/afg/a/docs-per-category.html
 *   https://en.wikipedia.org/wiki/Afghan_passport
 *   https://www.iom.int/news/afghanistan-roll-out-icao-compliant-machine-readable-passport-and-visas-citizens
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]\d{8}$/;

const impl: Validator = {
  name: 'Afghan Passport Number',
  localName: 'د تذکره افغانستان',
  abbreviation: 'PASSPORT',
  examples: ['P01234567'],
  formats: ['annnnnnnn'],

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

/**
 * Belizean Passport Number (Belize Passport).
 *
 * Format: Two uppercase letters followed by six digits (e.g. PA123456). Note: this is the project's existing guess; no authoritative source was found confirming it, and one secondary source suggested a single-letter + 7-digit (8-char) format instead. Kept as-is pending an authoritative source.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Belizean_passport
 *   https://www.consilium.europa.eu/prado/en/prado-documents/blz/index.html
 *   https://immigration.gov.bz/passport/passport-requirements/
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
  name: 'Belizean Passport Number',
  localName: 'Belize Passport',
  abbreviation: 'Passport',
  examples: ['PA123456'],
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

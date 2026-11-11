/**
 * Israeli Passport Number (דרכון ישראלי).
 *
 * Format: Eight numeric digits, no letters, no spaces or delimiters (modern biometric Darkon passport).
 *
 * Source
 *   https://en.wikipedia.org/wiki/Israeli_passport
 *   https://www.consilium.europa.eu/prado/en/ISR-AP-03001/index.html
 *   https://embassies.gov.il/usa/en/services/israeli-citizens/issuance-travel-documents-passport-citizens-and-residents-israel
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
  name: 'Israeli Passport Number',
  localName: 'דרכון ישראלי',
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

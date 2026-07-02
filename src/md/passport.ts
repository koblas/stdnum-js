/**
 * Moldovan Passport Number (Pașaport moldovenesc).
 *
 * Format: Moldovan biometric passport serials are commonly seen as a single letter prefix followed by 7 digits (e.g. A01234567 style, i.e. one letter + 7 digits = 8 chars). The project's existing guess of two letters + 6 digits is also retained as an alternative. No authoritative ICAO/government/Purview source documents the exact serial structure, so this is uncertain.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Moldovan_passport
 *   https://mfa.gov.md/en/content/biometric-passport
 *   https://www.consilium.europa.eu/prado/en/prado-documents/mda/a/docs-per-category.html
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]\d{7}$|^[A-Z]{2}\d{6}$/;

const impl: Validator = {
  name: 'Moldovan Passport Number',
  localName: 'Pașaport moldovenesc',
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

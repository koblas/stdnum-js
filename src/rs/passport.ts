/**
 * Serbian Passport Number (Српски пасош).
 *
 * Format: Serbian biometric passport: the passport (serial) number is nine characters. Sources describe it as 'nine alphanumeric characters', but in practice the human-entered passport number on Serbian biometric passports is a 9-digit numeric serial. Kept numeric-only to match observed documents.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Serbian_passport
 *   https://www.consilium.europa.eu/prado/en/prado-documents/srb/a/docs-per-category.html
 *   https://www.mfa.gov.rs/en/citizens/services/travel-documents
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^\d{9}$/;

const impl: Validator = {
  name: 'Serbian Passport Number',
  localName: 'Српски пасош',
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

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

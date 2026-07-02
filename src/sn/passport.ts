/**
 * Senegalese Passport Number (Passeport sénégalais).
 *
 * Format: 9 numeric digits. Senegalese passports have been ICAO machine-readable (MRP) since 2007, but no authoritative source consulted documents the exact serial composition. The current 9-digit guess is retained for lack of better evidence.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Senegalese_passport
 *   https://www.consilium.europa.eu/prado/en/prado-documents/SEN/A/docs-per-category.html
 *   https://sn.usembassy.gov/passports/important-passport-information/
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
  name: 'Senegalese Passport Number',
  localName: 'Passeport sénégalais',
  abbreviation: 'PASSPORT',

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

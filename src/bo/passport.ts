/**
 * Bolivian Passport Number (Pasaporte boliviano).
 *
 * Format: Bolivian passport number. No authoritative published spec for the exact letter/digit layout could be found. Bolivian e-passports (MRP, 32 pages) carry a document number in the MRZ, but neither ICAO, the Bolivian Direccion General de Migracion, Microsoft Purview (no SIT exists), nor Wikipedia document the precise structure. The current project guess of 2 letters + 6 digits is undocumented. Replaced with a broad alphanumeric 6-9 character pattern reflecting the general uncertainty rather than asserting an unverified specific shape.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Bolivian_passport
 *   https://travel.state.gov/content/travel/en/us-visas/Visa-Reciprocity-and-Civil-Documents-by-Country/Bolivia.html
 *   https://learn.microsoft.com/en-us/purview/sit-defn-bolivia-passport-number
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z0-9]{6,9}$/;

const impl: Validator = {
  name: 'Bolivian Passport Number',
  localName: 'Pasaporte boliviano',
  abbreviation: 'Passport',
  examples: ['AB123456', '1234567'],
  formats: ['cccccccc', 'ccccccc', 'ccccccccc', 'cccccc'],

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

    if (value.length < 6 || value.length > 9) {
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

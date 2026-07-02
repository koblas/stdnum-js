/**
 * Saint Lucian Passport Number (Saint Lucian passport).
 *
 * Format: Could not find an authoritative specification for the Saint Lucia passport number. Saint Lucia issues ICAO-compliant CARICOM/OECS biometric e-passports, but no government or standards source documents the serial structure. The project's current guess is 1 letter followed by 6 digits.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Saint_Lucian_passport
 *   https://www.govt.lc/services/issuance-of-passports
 *   https://www.idanalyzer.com/solutions/supported-documents/lc.html
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]\d{6}$/;

const impl: Validator = {
  name: 'Saint Lucian Passport Number',
  localName: 'Saint Lucian passport',
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

    if (value.length !== 7) {
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

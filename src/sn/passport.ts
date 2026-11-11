/**
 * Senegalese Passport Number (Passeport sénégalais).
 *
 * Format: Senegalese passport number: nine digits, or one letter followed by eight digits (e.g. A12345678).
 *
 * Source
 *   https://sanctionslist.ofac.treas.gov/Home/SdnList (OFAC SDN list: format cross-check)
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

const idRegexp = /^(?:\d{9}|[A-Z]\d{8})$/;

const impl: Validator = {
  name: 'Senegalese Passport Number',
  localName: 'Passeport sénégalais',
  abbreviation: 'PASSPORT',
  examples: ['123456789', 'A12345678'],
  formats: ['cnnnnnnnn'],

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

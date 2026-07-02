/**
 * Bangladeshi Passport Number (বাংলাদেশী পাসপোর্ট).
 *
 * Format: Two uppercase letters followed by seven digits (e.g. AB1234567), the ICAO 9-character machine-readable passport serial.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Bangladeshi_passport
 *   https://www.gov.uk/government/publications/bangladesh-country-policy-and-information-notes/country-information-note-documentation-bangladesh-november-2024-accessible
 *   https://www.epassport.gov.bd/
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]{2}\d{7}$/;

const impl: Validator = {
  name: 'Bangladeshi Passport Number',
  localName: 'বাংলাদেশী পাসপোর্ট',
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

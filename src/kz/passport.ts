/**
 * Kazakhstani Passport Number (Қазақстан паспорты).
 *
 * Format: One letter followed by 7 or 8 digits. Modern Kazakhstani (biometric, ICAO Doc 9303) passports are widely reported to use an 'N' prefix followed by 8 digits (9 characters total, e.g. N12345678); older/other series use a letter + 7 digits.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Kazakhstani_passport
 *   https://www.consilium.europa.eu/prado/en/KAZ-AO-02001/index.html
 *   https://landinfo.no/wp-content/uploads/2018/03/KazakhstanPassports-ID-cards-and.pdf
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]\d{7,8}$/;

const impl: Validator = {
  name: 'Kazakhstani Passport Number',
  localName: 'Қазақстан паспорты',
  abbreviation: 'PASSPORT',
  examples: ['N12345678', 'A1234567'],
  formats: ['annnnnnnn', 'annnnnnn'],

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

    if (value.length < 8 || value.length > 9) {
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

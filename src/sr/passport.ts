/**
 * Surinamese Passport Number (Surinaams paspoort).
 *
 * Format: One letter prefix followed by 6 to 7 digits. The U.S. Department of State reciprocity page states that the regular Suriname passport number 'starts with R' (single-letter prefix), with other prefixes for service/diplomatic/emergency booklets, contradicting the current two-letter guess.
 *
 * Source
 *   https://travel.state.gov/content/travel/en/us-visas/Visa-Reciprocity-and-Civil-Documents-by-Country/Suriname.html
 *   https://en.wikipedia.org/wiki/Surinamese_passport
 *   https://burgerzaken.gov.sr/paspoorten
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]\d{6,7}$/;

const impl: Validator = {
  name: 'Surinamese Passport Number',
  localName: 'Surinaams paspoort',
  abbreviation: 'PASSPORT',
  examples: ['R123456', 'B1234567'],
  formats: ['annnnnn', 'annnnnnn'],

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

    if (value.length < 7 || value.length > 8) {
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

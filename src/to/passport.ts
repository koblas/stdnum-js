/**
 * Tongan Passport Number (Tongan passport).
 *
 * Format: 6 digits. Tongan MRPs are lodged via the Tonga Consulate General. No authoritative source publishes the serial composition; 6 digits is an unverified guess.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Tongan_passport
 *   https://travel.state.gov/content/travel/en/us-visas/Visa-Reciprocity-and-Civil-Documents-by-Country/Tonga.html
 *   https://ago.gov.to/cms/images/LEGISLATION/SUBORDINATE/2508/2508-0001/PassportRegulations_2.pdf
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[0-9]{6}$/;

const impl: Validator = {
  name: 'Tongan Passport Number',
  localName: 'Tongan passport',
  abbreviation: 'PASSPORT',
  examples: ['123456'],
  formats: ['nnnnnn'],

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

    if (value.length !== 6) {
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

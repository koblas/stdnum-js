/**
 * Bahamian Passport Number (Bahamian passport).
 *
 * Format: Bahamian passport number. Multiple secondary sources describe it as a 9-character alphanumeric number, but the exact split between letters and digits is not authoritatively documented. The current project guess (1 letter + 6 digits = 7 chars) is plausible for older books but conflicts with the repeatedly cited '9-character' figure for the modern e-passport. Widened to allow 1-2 leading letters plus 6-7 digits to cover both observed possibilities.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Bahamian_passport
 *   https://travel.state.gov/content/travel/en/us-visas/Visa-Reciprocity-and-Civil-Documents-by-Country/Bahamas.html
 *   https://www.gov.uk/government/publications/bahamas-knowledge-base-profile/bahamas-knowledge-base-profile
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]{1,2}\d{6,7}$/;

const impl: Validator = {
  name: 'Bahamian Passport Number',
  localName: 'Bahamian passport',
  abbreviation: 'PASSPORT',
  examples: ['C123456', 'PA1234567'],
  formats: ['annnnnn', 'aannnnnnn', 'acnnnnnn'],

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

    if (value.length < 7 || value.length > 9) {
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

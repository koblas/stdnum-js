/**
 * Tajik Passport Number (Паспортии Тоҷикистон).
 *
 * Format: 9 digits (no letters). Tajikistan biometric MRPs (issued since Feb 2010). No authoritative source publishes the exact serial composition; 9 digits is a plausible but unverified pattern.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Tajik_passport
 *   https://travel.state.gov/content/travel/en/us-visas/Visa-Reciprocity-and-Civil-Documents-by-Country/Tajikistan.html
 *   https://mfa.tj/en/berlin/consular-issues/procedure-of-obtaining-passport
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[0-9]{9}$/;

const impl: Validator = {
  name: 'Tajik Passport Number',
  localName: 'Паспортии Тоҷикистон',
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

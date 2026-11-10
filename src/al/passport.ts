/**
 * Albanian Passport Number (Pasaportë shqiptar).
 *
 * Format: Albanian biometric passport number: two uppercase letters followed by seven digits (e.g. the serial printed in the 'Passport No.' field). No authoritative source explicitly documents the alphanumeric layout; this matches the widely-used convention and the project's current guess.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Albanian_passport
 *   https://travel.state.gov/content/travel/en/us-visas/Visa-Reciprocity-and-Civil-Documents-by-Country/Albania.html
 *   https://www.consilium.europa.eu/prado/en/ALB-AO-02001/index.html
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
  name: 'Albanian Passport Number',
  localName: 'Pasaportë shqiptar',
  abbreviation: 'Passport',

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

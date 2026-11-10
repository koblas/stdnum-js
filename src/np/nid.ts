/**
 * NIN (National Identification Number).
 *
 * Source
 *   https://en.wikipedia.org/wiki/National_Identity_Card_(Nepal)
 *   https://donidcr.gov.np/
 *   https://www.nepalitelecom.com/national-id-card
 *   https://notarynepal.com/blog/national-id-registration-in-nepal
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^\d{10}$/;

const impl: Validator = {
  name: 'National Identification Number',
  localName: 'राष्ट्रिय परिचयपत्र नम्बर (Rastriya Parichaya Patra Number)',
  abbreviation: 'NIN',

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

    if (value.length !== 10) {
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

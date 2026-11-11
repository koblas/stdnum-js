/**
 * Italian Passport Number (Passaporto italiano).
 *
 * Format: Two characters that may each be a letter or digit, followed by seven digits, total nine characters, no spaces or delimiters (e.g. AA1234567, YA1234567). Matches Microsoft Purview's Italy passport definition exactly.
 *
 * Source
 *   https://learn.microsoft.com/en-us/purview/sit-defn-italy-passport-number
 *   https://docs.trellix.com/bundle/data-loss-prevention-11.10.x-classification-definitions-reference-guide/page/UUID-8d3d80c4-db8b-0524-8845-e2af30c6de6d.html
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z0-9]{2}\d{7}$/;

const impl: Validator = {
  name: 'Italian Passport Number',
  localName: 'Passaporto italiano',
  abbreviation: 'Passport',
  examples: ['AA1234567', '1A1234567'],
  formats: ['ccnnnnnnn'],

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

/**
 * Omani Passport Number (جواز سفر عماني).
 *
 * Format: 1 uppercase letter followed by 7 digits (most commonly cited third-party format for Omani biometric passports, issued from 2014). Not confirmed against a primary/government source.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Omani_passport
 *   https://www.consilium.europa.eu/prado/en/prado-documents/omn/a/docs-per-category.html
 *   https://www.rop.gov.om/english/e_passport.aspx
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]\d{7}$/;

const impl: Validator = {
  name: 'Omani Passport Number',
  localName: 'جواز سفر عماني',
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

    if (value.length !== 8) {
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

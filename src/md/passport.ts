/**
 * Moldovan Passport Number (Pașaport moldovenesc).
 *
 * Format: Moldovan passport number: one or two letters followed by six or seven digits (e.g. AB1893585, A1234567, AB123456).
 *
 * Source
 *   https://sanctionslist.ofac.treas.gov/Home/SdnList (OFAC SDN list: real passport numbers with future expiry)
 *   https://en.wikipedia.org/wiki/Moldovan_passport
 *   https://mfa.gov.md/en/content/biometric-passport
 *   https://www.consilium.europa.eu/prado/en/prado-documents/mda/a/docs-per-category.html
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
  name: 'Moldovan Passport Number',
  localName: 'Pașaport moldovenesc',
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

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

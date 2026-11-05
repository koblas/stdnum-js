/**
 * Haitian Passport Number (Passeport haïtien).
 *
 * Format: Haitian passport number: two letters followed by six or seven digits (e.g. RL123456, PP5201306), or one letter followed by eight digits (e.g. R10097145).
 *
 * Source
 *   https://sanctionslist.ofac.treas.gov/Home/SdnList (OFAC SDN list: real passport numbers with future expiry)
 *   https://www.ecoi.net/en/document/1416369.html
 *   https://en.wikipedia.org/wiki/Haitian_passport
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^(?:[A-Z]{2}\d{6,7}|[A-Z]\d{8})$/;

const impl: Validator = {
  name: 'Haitian Passport Number',
  localName: 'Passeport haïtien',
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

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

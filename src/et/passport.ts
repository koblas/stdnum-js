/**
 * Ethiopian Passport Number (የኢትዮጵያ ፓስፖርት).
 *
 * Format: Letter E (optionally followed by a second letter such as P on modern e-passports) followed by 6 or 7 digits. Historically: E + 6 digits (post-1990); modern biometric e-passports commonly EP + 7 digits.
 *
 * Source
 *   https://www.ecoi.net/en/document/1254536.html
 *   https://en.wikipedia.org/wiki/Ethiopian_passport
 *   https://www.consilium.europa.eu/prado/en/ETH-AD-01001/index.html
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^E[A-Z]?\d{6,7}$/;

const impl: Validator = {
  name: 'Ethiopian Passport Number',
  localName: 'የኢትዮጵያ ፓስፖርት',
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

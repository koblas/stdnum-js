/**
 * Belarusian Passport Number (Пашпарт Беларусі).
 *
 * Format: Belarusian biometric (foreign-travel) passport serial number: 2 uppercase letters (regional series) followed by 7 digits, e.g. MP1234567, total 9 characters. The two-letter series encodes the issuing region/authority: AB (Brest), BM (Vitebsk), HB (Gomel), KH (Grodno), MP (Minsk city), MC (Minsk region), KB (Mogilev), PP (Ministry of Foreign Affairs), among others.
 *
 * Source
 *   https://travel.state.gov/content/travel/en/us-visas/Visa-Reciprocity-and-Civil-Documents-by-Country/Belarus.html
 *   https://en.wikipedia.org/wiki/Belarusian_passport
 *   https://mfa.gov.by/en/visa/biometricheskie_dokumenty/
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
  name: 'Belarusian Passport Number',
  localName: 'Пашпарт Беларусі',
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

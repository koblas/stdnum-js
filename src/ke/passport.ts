/**
 * Kenyan Passport Number (Kenyan Passport).
 *
 * Format: One or two uppercase letters followed by 6 to 8 digits. The common ordinary passport is the 'A' series (single letter A + digits); the EAC e-passport (since 2017) also uses an alphanumeric serial. Exact digit count is not authoritatively published.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Kenyan_passport
 *   https://immigration.go.ke/passport-section/
 *   https://docs.usesmileid.com/supported-id-types/for-individuals-kyc/backed-by-id-authority/supported-countries/kenya/passport
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]{1,2}\d{6,8}$/;

const impl: Validator = {
  name: 'Kenyan Passport Number',
  localName: 'Kenyan Passport',
  abbreviation: 'Passport',
  examples: ['A1234567', 'AK123456'],
  formats: ['acnnnnnn', 'annnnnn', 'acnnnnnnn', 'aannnnnnnn'],

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

    if (value.length < 7 || value.length > 10) {
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

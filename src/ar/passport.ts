/**
 * Argentine Passport Number (Pasaporte argentino).
 *
 * Format: Modern Argentine biometric passport number (issued since Dec 2012): three uppercase letters followed by six digits (AAA000000). Older pre-2012 passports used the holder's 9-digit national ID number plus a trailing letter, but those are no longer issued.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Argentine_passport
 *   https://trustdochub.com/en/verify-argentine-passport/
 *   https://www.passportindex.org/passport/argentina/
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]{3}\d{6}$/;

const impl: Validator = {
  name: 'Argentine Passport Number',
  localName: 'Pasaporte argentino',
  abbreviation: 'Passport',
  examples: ['AAB123456'],
  formats: ['aaannnnnn'],

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

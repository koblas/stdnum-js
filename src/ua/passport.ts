/**
 * Ukrainian Passport Number (Український паспорт).
 *
 * Format: Modern Ukrainian international (biometric) passport: passport series of two Latin letters followed by a six-digit number (8 characters total), e.g. FC123456. Microsoft Purview defines the Ukraine international passport as an eight-character alphanumeric pattern: 'two letters or digits' followed by 'six digits', so the leading two positions may also appear as digits in some records; the all-digit 8-character variant is included to cover that.
 *
 * Source
 *   https://learn.microsoft.com/en-us/purview/sit-defn-ukraine-passport-international
 *   https://en.wikipedia.org/wiki/Ukrainian_passport
 *   https://mvs.gov.ua/en/news/nomer-ta-seriia-pasportu-de-sukati
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]{2}\d{6}$|^\d{8}$/;

const impl: Validator = {
  name: 'Ukrainian Passport Number',
  localName: 'Український паспорт',
  abbreviation: 'Passport',
  examples: ['FC123456'],
  formats: ['aannnnnn', 'nnnnnnnn'],

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

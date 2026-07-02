/**
 * Swiss Passport Number (Schweizer Pass).
 *
 * Format: Eight characters beginning with an uppercase letter. Old Pass 10 (2010): the letter 'X' followed by 7 digits (e.g. X1234567). New Pass 22 (since Oct 2022): a non-public mixed alphanumeric scheme, 8 characters, leading letter then a mix of digits and letters (e.g. S0A00A00). Letters O and I are not used.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Swiss_passport
 *   https://www.travelnews.ch/english-corner/26038-how-can-you-distinguish-between-a-zero-and-an-o-in-a-passport.html
 *   https://www.thelocal.ch/20250901/letter-or-number-how-to-decode-the-mystery-of-your-swiss-passport
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z][0-9A-Z]{7}$/;

const impl: Validator = {
  name: 'Swiss Passport Number',
  localName: 'Schweizer Pass',
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

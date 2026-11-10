/**
 * Brazilian Passport Number (Passaporte brasileiro).
 *
 * Format: Brazilian passport number: 2 uppercase letters (series identifier) followed by 6 digits, e.g. FA123456. The two letters denote the issuance series and the six digits are the sequential number within that series. This matches the current passport book format issued by the Policia Federal.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Brazilian_passport
 *   https://www.consilium.europa.eu/prado/en/BRA-AO-01001/index.html
 *   https://www.consilium.europa.eu/prado/en/BRA-AO-05001/index.html (2015 specimen: 8 characters, 2-letter prefix)
 *   https://github.com/brazilian-utils/python/blob/main/brutils/passport.py (^[A-Z]{2}[0-9]{6}$)
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]{2}\d{6}$/;

const impl: Validator = {
  name: 'Brazilian Passport Number',
  localName: 'Passaporte brasileiro',
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

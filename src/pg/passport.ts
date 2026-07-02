/**
 * Papua New Guinean Passport Number (Papua New Guinean passport).
 *
 * Format: No authoritative public documentation of the Papua New Guinea passport serial-number format was found. The official issuer (ICA.gov.pg) and Wikipedia refer only to a 'serial number' without specifying composition. Papua New Guinean MRPs (ICAO Doc 9303 compliant) commonly use an 8-character numeric serial, which matches the current guess, but this is unverified.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Papua_New_Guinean_passport
 *   https://ica.gov.pg/passport/applying-for-a-png-passport
 *   https://www.passportindex.org/passport/papua-new-guinea/
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[0-9]{8}$/;

const impl: Validator = {
  name: 'Papua New Guinean Passport Number',
  localName: 'Papua New Guinean passport',
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

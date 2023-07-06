/**
 * Tax Code
 *
 * Individual taxpayers who have neither National ID Card Number nor UI Number
 * (usually because they were not physically present or only stayed for a short
 * period of time in the R.O.C.) may produce Tax Codes themselves as their TINs
 * by reference to the coding princip
 *
 * Tax Code
 *  (1) For individuals of Mainland China area: a seven-digit code that begins with 9
 *  followed by the last two numbers of the individuals’ birth year and the four
 *  numbers of the individuals’ birth month and day (mmdd).
 *  (2) For individuals other than the ones indicated in (1): a ten-digit code that
 *  begins with the individuals’ date of birth (yyyymmdd), followed by the first
 *  two alphabetic letters of the individuals’ name on the passport.
 *
 * Sources:
 *   https://www.mof.gov.tw/Eng/download/16968
 *
 * PERSON
 */

import { ValidateReturn } from '../types';
import * as exceptions from '../exceptions';
import {
  isValidDateCompactYYMMDD,
  isValidDateCompactYYYYMMDD,
  strings,
} from '../util';

function clean(input: string) {
  return strings.cleanUnicode(input, ' -');
}

const impl = {
  abbreviation: '',
  localName: '',
  name: 'Tax Code',

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

    if (value.length !== 10 && value.length !== 7) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (value.length === 7) {
      const [lead, yymmdd] = strings.splitAt(value, 1);
      if (lead !== '9') {
        return { isValid: false, error: new exceptions.InvalidFormat() };
      }
      if (!strings.isdigits(yymmdd)) {
        return { isValid: false, error: new exceptions.InvalidFormat() };
      }
      if (!isValidDateCompactYYMMDD(yymmdd)) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
    } else {
      const [yyyymmdd, name] = strings.splitAt(value, 8);
      if (!isValidDateCompactYYYYMMDD(yyyymmdd)) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
      if (!/^[A-Z]+$/i.test(name)) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
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
export default impl;

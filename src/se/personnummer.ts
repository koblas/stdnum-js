/**
 * Personnummer (Swedish personal identity number).
 *
 * The Swedish Personnummer is assigned at birth to all Swedish nationals and to
 * immigrants for tax and identification purposes. The number consists of 10 or
 * 12 digits and starts with the birth date, followed by a serial and a check
 * digit.
 *
 * Source:
 *    https://en.wikipedia.org/wiki/Personal_identity_number_(Sweden)
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { isValidDateCompactYYYYMMDD, strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { luhnChecksumValidate } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  const [value, err] = strings.cleanUnicode(input, ' :');

  if (err) {
    return [value, err];
  }

  const [a, b, c] = strings.splitAt(value, -5, -4);

  return [`${a.replace(/[-+]/g, '')}${b}${c}`, null];
}

const impl: Validator = {
  name: 'Swedish Personal Identity Number',
  localName: 'Personnummer',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, -4).join('-');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    let a, b, c;
    if (value.length === 11) {
      [a, b, c] = strings.splitAt(value, -5, -4);
    } else if (value.length === 13) {
      [, a, b, c] = strings.splitAt(value, -11, -5, -4);
    } else {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!'-+'.includes(b)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    const digits = `${a}${c}`;
    if (!strings.isdigits(digits)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    let yyyymmdd;
    if (value.length === 13) {
      yyyymmdd = value.substring(0, 8);
    } else {
      const yymmdd = value.substring(0, 6);
      const year = new Date().getFullYear();
      let century = Math.floor(year / 100);

      if (parseInt(yymmdd.substring(0, 2), 10) > year % 100) {
        century -= 1;
      }
      if (b === '+') {
        century -= 1;
      }

      yyyymmdd = `${century}${yymmdd}`;
    }
    if (!isValidDateCompactYYYYMMDD(yyyymmdd)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    if (!luhnChecksumValidate(digits)) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
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

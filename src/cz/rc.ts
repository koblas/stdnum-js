/**
 * RČ (Rodné číslo, the Czech birth number).
 *
 * The birth number (RČ, Rodné číslo) is the Czech national identifier. The
 * number can be 9 or 10 digits long. Numbers given out after January 1st
 * 1954 should have 10 digits. The number includes the birth date of the
 * person and their gender.
 *
 * This number is identical to the Slovak counterpart.
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { isValidDateCompactYYYYMMDD, strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' /');
}

const impl: Validator = {
  name: 'Czech Birth Number',
  localName: 'Rodné číslo',
  abbreviation: 'RČ',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 6).join('/');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 10 && value.length !== 9) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [yy, mm, dd] = strings.splitAt(value, 2, 4, 6);
    // Gender encode in month, Y2K incoded as well
    const mon = (parseInt(mm, 10) % 50) % 20;
    let year = parseInt(yy, 10) + 1900;
    if (value.length === 9) {
      if (year > 1980) {
        year -= 100;
      }
      if (year > 1953) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
    } else if (year < 1954) {
      year += 100;
    }
    if (
      !isValidDateCompactYYYYMMDD(`${year}${String(mon).padStart(2, '0')}${dd}`)
    ) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    // 9 digit numbers were used until 1954
    // only 10 digit numbers have check digits
    if (value.length === 10) {
      const [front, check] = strings.splitAt(value, -1);

      const sum = (parseInt(front, 10) % 11) % (year < 1985 ? 10 : 11);

      if (String(sum) !== check) {
        return { isValid: false, error: new exceptions.InvalidChecksum() };
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

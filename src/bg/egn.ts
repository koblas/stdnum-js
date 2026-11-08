/**
 * EGN (ЕГН, Единен граждански номер, Bulgarian personal identity codes).
 *
 * It is a 10-digit number of which the first 6 digits denote the person's
 * birth date, the next three digits represent a birth order number from
 * which the person's gender can be determined and the last digit is a check
 * digit.
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { isValidDate, strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { weightedSum } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -.');
}

const impl: Validator = {
  name: 'Bulgarian Personal Identity Codes',
  localName: 'Единен граждански номер',
  abbreviation: 'ЕГН (EGN)',
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
    if (value.length !== 10) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    // The first six digits are the birth date. The month encodes the century:
    // 41-52 -> 2000s, 21-32 -> 1800s, 01-12 -> 1900s.
    const [yy, mm, dd] = strings.splitAt(value, 2, 4, 6);
    let year = parseInt(yy, 10);
    let month = parseInt(mm, 10);
    if (month > 40) {
      year += 2000;
      month -= 40;
    } else if (month > 20) {
      year += 1800;
      month -= 20;
    } else {
      year += 1900;
    }
    if (!isValidDate(String(year), String(month), dd)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const [front, check] = strings.splitAt(value, -1);

    const sum = weightedSum(front, {
      modulus: 11,
      weights: [2, 4, 8, 5, 10, 9, 7, 3, 6],
    });

    if (String(sum % 10) !== check) {
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

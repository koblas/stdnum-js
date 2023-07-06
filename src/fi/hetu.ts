/**
 * HETU (Henkilötunnus, Finnish personal identity code).
 *
 * Module for handling Finnish personal identity codes (HETU, Henkilötunnus).
 * See https://www.vaestorekisterikeskus.fi/default.aspx?id=45 for checksum
 * calculation details and https://tarkistusmerkit.teppovuori.fi/tarkmerk.htm#hetu1
 * for historical details.
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { isValidDateCompactYYYYMMDD, strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' ');
}

const CHECK_ALPHA = '0123456789ABCDEFHJKLMNPRSTUVWXY';
const CENTURY: Record<string, string> = {
  '+': '18',
  '-': '19',
  Y: '19',
  X: '19',
  W: '19',
  V: '19',
  U: '19',
  A: '20',
  B: '20',
  C: '20',
  D: '20',
  E: '20',
  F: '20',
};
const VALID_CENTURY = Object.keys(CENTURY);

const impl: Validator = {
  name: 'Finnish Personal Identity Code',
  localName: 'Henkilötunnus',
  abbreviation: 'HETU',

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
    if (value.length !== 11) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    const [front, , back, check2] = strings.splitAt(value, 6, 7, -1);
    if (
      !strings.isdigits(front) ||
      !strings.isdigits(back) ||
      !CHECK_ALPHA.includes(check2)
    ) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    if (!VALID_CENTURY.includes(value[6])) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const [dd, mm, yy, century, person, check] = strings.splitAt(
      value,
      2,
      4,
      6,
      7,
      10,
    );
    const dstr = `${CENTURY[century]}${yy}${mm}${dd}`;
    if (!isValidDateCompactYYYYMMDD(dstr)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const checkable = `${dd}${mm}${yy}${person}`;
    if (CHECK_ALPHA[parseInt(checkable, 10) % CHECK_ALPHA.length] !== check) {
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

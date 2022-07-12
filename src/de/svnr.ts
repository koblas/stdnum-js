/**
 * SVNR or RVNR (Sozialversicherungsnummer, German social security / pension insurance number).
 *
 * The SVNR (or RVNR) is the German social security / pension insurance number.
 * It's also called a social insuarance number. The number consists of 12 digits.
 *
 * Source
 *   https://de.wikipedia.org/wiki/Versicherungsnummer
 *   https://allaboutberlin.com/guides/german-versicherungsnummer
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { weightedSum } from '../util/checksum';
import { Validator, ValidateReturn } from '../types';

const AREA_NUMBER_OPTIONS = [
  '02',
  '03',
  '04',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '23',
  '24',
  '25',
  '26',
  '28',
  '29',
  '38',
  '39',
  '40',
  '80',
  '81',
  '82',
  '89',
].concat([...Array(79 - 42 + 1).keys()].map(x => (x + 42).toString())); // '42'-'79'

const BIRTH_MONTH_OPTIONS = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
];

const checkAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const checkAlphabetDict: Record<string, number> = checkAlphabet
  .split('')
  .reduce(
    (acc, c, idx) => ({
      ...acc,
      [c]: String(idx + 1).padStart(2, '0'),
    }),
    {},
  );

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const impl: Validator = {
  name: 'German Pension Insurance Number',
  localName: 'Sozialversicherungsnummer',
  abbreviation: 'SVNR',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 2, 8, 9).join(' ');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 12) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isalphanumeric(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    if (!AREA_NUMBER_OPTIONS.includes(value.substring(0, 2))) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (!strings.isdigits(value.substring(2, 4))) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (!BIRTH_MONTH_OPTIONS.includes(value.substring(4, 6))) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (!strings.isdigits(value.substring(6, 8))) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (!strings.isalpha(value[8])) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (!strings.isdigits(value.substring(9, 11))) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const [frontWithAlpha, check] = strings.splitAt(value, 11);
    const front = frontWithAlpha
      .split('')
      .map(c => checkAlphabetDict[c] ?? c)
      .join('');
    const sum = weightedSum(front, {
      weights: [2, 1, 2, 5, 7, 1, 2, 1, 2, 1, 2, 1],
      modulus: 10,
      sumByDigit: true,
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

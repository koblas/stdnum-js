/**
 * TIN (Armenian Tax Identification Number).
 *
 * The Armenian TIN (ՀՎՀՀ) is issued to individuals and entities. It has 8
 * digits: a 7 digit serial number followed by a check digit "calculated based
 * on the previous 7 digits".
 *
 * The State Revenue Committee does not publish the check digit algorithm. The
 * one used here was derived from published TINs: the check digit is the
 * weighted sum of the serial digits, with weights 2, 10, 5, 3, 3, 4, 9, modulo
 * 11. Serials where that sum is 0 or 10 are not issued, so a check digit of 0
 * is never valid. The rule was fitted on 36 bank and foundation TINs and then
 * matched all 5,492 TINs in the SRC's published list of non-profit and
 * foundation reports, none of which ends in 0. Almost all of those TINs start
 * with 0, so the weight of the first digit rests on two bank TINs that start
 * with 2 and 9.
 *
 * Sources
 *   https://www.oecd.org/content/dam/oecd/en/topics/policy-issue-focus/aeoi/armenia-tin.pdf
 *   https://www.src.am/am/getOrganizationReports (TINs used to derive the check digit)
 *   https://github.com/koblas/stdnum-js/issues/15
 *
 * PERSON/ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { weightedSum } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./');
}

const impl: Validator = {
  name: 'Armenian Tax Identification Number',
  localName: 'Հարկ վճարողի հաշվառման համար',
  abbreviation: 'ՀՎՀՀ',
  examples: ['01234565'],
  formats: ['nnnnnnnn'],

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
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [front, check] = strings.splitAt(value, 7);
    const sum = weightedSum(front, {
      weights: [2, 10, 5, 3, 3, 4, 9],
      modulus: 11,
    });

    // A sum of 0 or 10 has no check digit: those serials are not issued
    if (sum === 0 || sum === 10 || String(sum) !== check) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: true,
      isCompany: true,
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

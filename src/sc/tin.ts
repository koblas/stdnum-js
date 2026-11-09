/**
 * TIN (Seychelles Tax Identification Number).
 *
 * The Seychelles TIN is issued by the Seychelles Revenue Commission to anyone
 * liable for revenue. It is a randomly generated 9 digit number that meets a
 * checksum requirement.
 *
 * The SRC does not publish the checksum. The one used here was derived from
 * TINs in the SRC's public register of businesses: the last digit is the
 * weighted sum of the first 8 digits, with weights 1, 4, 3, 7, 5, 8, 6, 9,
 * modulo 11. Numbers where that sum is 10 are not issued. The rule matched
 * 1,241 of the 1,242 TINs in the register search results.
 *
 * Sources
 *   https://www.oecd.org/content/dam/oecd/en/topics/policy-issue-focus/aeoi/seychelles-tin.pdf
 *   https://eservice.egov.sc/TinRegistration/pages/SBNSearch.aspx (TINs used to derive the checksum)
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
  name: 'Seychelles Tax Identification Number',
  localName: 'Tax Identification Number',
  abbreviation: 'TIN',

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
    if (value.length !== 9) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [front, check] = strings.splitAt(value, 8);
    const sum = weightedSum(front, {
      weights: [1, 4, 3, 7, 5, 8, 6, 9],
      modulus: 11,
    });

    // A sum of 10 has no check digit: those numbers are not issued
    if (String(sum) !== check) {
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

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

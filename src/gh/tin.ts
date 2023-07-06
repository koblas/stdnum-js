/**
 * TIN (Taxpayer Identification Number, Ghana tax number).
 * 
 * This number is issued by the Ghana Revenue Authority (GRA) to individuals who
 * are not eligible for the Ghanacard PIN and other entities.
 * This number consists of 11 alpha-numeric characters. It begins with one of the
 * following prefixes:
 *   P00 For Individuals.
 *   C00 For Companies limited by guarantee, shares, Unlimited (i.e organisation
 *       required to register with the RGD).
 *   G00 Government Agencies, MDAs.
 *   Q00 Foreign Missions, Employees of foreign missions.
 *   V00 Public Institutions, Trusts, Co-operatives, Foreign Shareholder
 *       (Offshore), (Entities not registered by RGD).
 * 
 * Source
 *   https://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/Ghana-TIN.pdf
 *   https://gra.gov.gh/tin/
 *   https://gra.gov.gh/tin/tin-faq/

 * ENTITY/PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { weightedSum } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const validRe = /^[PCGQV]{1}00[A-Z0-9]{8}$/;

const ALPHABET = '0123456789X';

const impl: Validator = {
  name: 'Taxpayer Identification Number',
  localName: '',
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
    if (value.length !== 11) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    if (!validRe.test(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [, front, check] = strings.splitAt(value, 1, 10);

    const sum = weightedSum(front, {
      weights: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      modulus: 11,
    });

    if (ALPHABET[sum] !== check) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: value[0] === 'P',
      isCompany: value[0] !== 'P',
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

/**
 * CNIC (Pakistan Computerize National Identiy Card)
 *
 * Pakastan National Identification Number (CNIC) is issued to individuals and legal entities for
 * tax purposes. The number consists of 13 digits.
 *
 * The CNIC (Computerised National Identity Card, قومی شناختی کارڈ) or SNIC
 * (Smart National Identity Card) is issued by by Pakistan's NADRA (National
 * Database and Registration Authority) to citizens of 18 years or older.
 * The number consists of 13 digits and encodes the person's locality (5
 * digits), followed by 7 digit serial number an a single digit indicating
 * gender.
 *
 * Sources
 *   https://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/Pakistan-TIN.pdf
 *   https://en.wikipedia.org/wiki/CNIC_(Pakistan)
 *   https://www.nadra.gov.pk/identity/identity-cnic/
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

const PROVINCES = {
  '1': 'Khyber Pakhtunkhwa',
  '2': 'FATA',
  '3': 'Punjab',
  '4': 'Sindh',
  '5': 'Balochistan',
  '6': 'Islamabad',
  '7': 'Gilgit-Baltistan',
};
const VALID_PROVINCES = Object.keys(PROVINCES);

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const impl: Validator = {
  name: 'Pakistani Computerized National Identification Number',
  localName: 'Computerized National Identification Number',
  abbreviation: 'CNIC',

  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 5, 12).join('-');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 13) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    // Invalid Gender (male = 13579, female = 2468)
    if (value[12] === '0') {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    if (!VALID_PROVINCES.includes(value[0])) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    // if (value[12] === '0') {
    //   return { isValid: false, error: new exceptions.InvalidComponent() };
    // }

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

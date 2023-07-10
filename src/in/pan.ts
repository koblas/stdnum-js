/**
 * PAN (Permanent Account Number, Indian income tax identifier).
 *
 * The Permanent Account Number (PAN) is a 10 digit alphanumeric identifier for
 * Indian individuals, families and corporates for income tax purposes. It is
 * also issued to foreign nationals subject to a valid visa.
 *
 * PAN is made up of 5 letters, 4 digits and 1 alphabetic check digit. The 4th
 * character indicates the type of holder, the 5th character is either 1st
 * letter of the holder's name or holder's surname in case of 'Individual' PAN,
 * next 4 digits are serial numbers running from 0001 to 9999 and the last
 * character is a check digit computed by an undocumented checksum algorithm
 *
 * More information:
 *   https://en.wikipedia.org/wiki/Permanent_account_number
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const PAN_HOLDER_TYPES: Record<string, string> = {
  A: 'Association of Persons (AOP)',
  B: 'Body of Individuals (BOI)',
  C: 'Company',
  F: 'Firm/Limited Liability Partnership',
  G: 'Government Agency',
  H: 'Hindu Undivided Family (HUF)',
  L: 'Local Authority',
  J: 'Artificial Juridical Person',
  P: 'Individual',
  T: 'Trust',
  K: 'Krish (Trust Krish)',
};
const VALID_PAN_HOLDERS = Object.keys(PAN_HOLDER_TYPES);

const impl: Validator = {
  name: 'Indian Income Tax Identifier',
  localName: 'Permanent Account Number',
  abbreviation: 'PAN',
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
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    if (!VALID_PAN_HOLDERS.includes(value[3])) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    const [, foo] = strings.splitAt(value, 5, 9);
    if (foo === '0000') {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: false,
      isCompany: true,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

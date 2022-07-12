/**
 * BN (Canadian Business Number).
 *
 * A Business Number (BN) is a 9-digit identification number for businesses
 * issued by the Canada Revenue Agency for tax purposes. The 9-digit number can
 * be followed by two letters (program identifier) and 4 digits (reference
 * number) to form a program account (or BN15).
 *
 * Source:
 *   https://www.canada.ca/en/services/taxes/business-number.html
 *   https://www.ic.gc.ca/app/scr/cc/CorporationsCanada/fdrlCrpSrch.html?locale=en_CA/
 *
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { luhnChecksumValidate } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const impl: Validator = {
  name: 'Canadian Business Number',
  localName: 'Business Number',
  abbreviation: 'BN',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    if (value.length === 15) {
      return strings.splitAt(value, 5, 9, 11).join(' ');
    }
    return strings.splitAt(value, 5).join(' ');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 9 && value.length !== 15) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    const [front, rest] = strings.splitAt(value, 9);
    if (!strings.isdigits(front)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    if (!luhnChecksumValidate(front)) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    if (rest) {
      const [a, b] = strings.splitAt(rest, 2);

      if (!['RC', 'RM', 'RP', 'RT'].includes(a)) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
      if (!strings.isdigits(b)) {
        return { isValid: false, error: new exceptions.InvalidFormat() };
      }
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

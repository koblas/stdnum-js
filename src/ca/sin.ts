/**
 * SIN (Canadian Social Insurance Number).
 *
 * The Social Insurance Number (SIN) is a 9-digit identifier issued to
 * individuals for various government programs. SINs that begin with a 9 are
 * issued to temporary workers who are neither Canadian citizens nor permanent
 * residents.
 *
 * Numbers starting with 0 (CRA-assigned temporary or individual tax numbers)
 * or 8 (business numbers) are not SINs.
 *
 * Source:
 *    https://www.canada.ca/en/employment-social-development/services/sin.html
 *    https://en.wikipedia.org/wiki/Social_Insurance_Number
 *    https://github.com/arthurdejong/python-stdnum/commit/3848318
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { luhnChecksumValidate } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const impl: Validator = {
  name: 'Canadian Social Insurance Number',
  localName: 'Social Insurance Number',
  abbreviation: 'SIN',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 3, 6).join('-');
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

    if (value[0] === '0' || value[0] === '8') {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (!luhnChecksumValidate(value)) {
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

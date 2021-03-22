/**
 * TIN (South African Tax Identification Number).
 *
 * The South African Tax Identification Number (TIN or Tax Reference Number) is
 * issued to individuals and legal entities for tax purposes. The number
 * consists of 10 digits.
 *
 * Source
 *   https://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/South-Africa-TIN.pdf
 *   https://www.sars.gov.za/
 *
 * PERSON/ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { luhnChecksumValidate } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -:', 'IT');
}

const impl: Validator = {
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
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    const code = parseInt(value.substr(7, 3), 10);
    if (!(code >= 1 && code <= 100) && ![120, 121, 888, 999].includes(code)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    if (!luhnChecksumValidate(value)) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: false,
      isCompany: false,
    };
  },
};

export const { validate, format, compact } = impl;

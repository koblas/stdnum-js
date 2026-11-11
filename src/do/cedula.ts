/**
 * Cedula (Dominican Republic national identification number).
 *
 * A cedula is is an 11-digit number issues by the Dominican Republic government
 * to citizens or residents for identification purposes. The last digit is a
 * Luhn check digit, but some numbers were issued that do not match it; those
 * are accepted from a list copied from python-stdnum.
 *
 * Source
 *   https://github.com/arthurdejong/python-stdnum/blob/master/stdnum/do/cedula.py
 *
 * VAT PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { luhnChecksumValidate } from '../util/checksum';
import { CEDULA_WHITELIST } from './cedula-whitelist';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const impl: Validator = {
  name: 'Dominican Republic National Identification Number',
  localName: 'Cedula',
  examples: ['00113918205'],
  formats: ['nnn-nnnnnnn-n'],
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 3, 10).join('-');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    if (CEDULA_WHITELIST.has(value)) {
      return {
        isValid: true,
        compact: value,
        isIndividual: true,
        isCompany: false,
      };
    }
    if (value.length !== 11) {
      return { isValid: false, error: new exceptions.InvalidLength() };
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

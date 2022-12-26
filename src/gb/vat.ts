/**
 * VAT (United Kingdom (and Isle of Man) VAT registration number).
 *
 * The VAT number can either be a 9-digit standard number, a 12-digit standard
 * number followed by a 3-digit branch identifier, a 5-digit number for
 * government departments (first two digits are GD) or a 5-digit number for
 * health authorities (first two digits are HA). The 9-digit variants use a
 * weighted checksum.
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings, weightedSum } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  const [value, err] = strings.cleanUnicode(input, ' -/');
  if (err !== null) {
    return [value, err];
  }
  if (value.startsWith('GB')) {
    return [value.substr(2), null];
  }
  return [value, null];
}

const impl: Validator = {
  name: 'United Kingdom (and Isle of Man) VAT Number',
  localName: 'Value Added Tax Registration Number',
  abbreviation: 'VAT Reg No',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 3, 7).join(' ');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }

    if (value.length === 5) {
      if (!strings.isdigits(value.substr(2))) {
        return { isValid: false, error: new exceptions.InvalidFormat() };
      }
      const cvalue = parseInt(value.substr(2), 10);
      if (value.startsWith('GD') && cvalue >= 500) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
      if (value.startsWith('HA') && cvalue < 500) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
    } else if (
      value.length === 11 &&
      (value.startsWith('GD8888') || value.startsWith('HA8888'))
    ) {
      if (!strings.isdigits(value.substr(6))) {
        return { isValid: false, error: new exceptions.InvalidFormat() };
      }
      const cvalue = parseInt(value.substr(6, 3), 10);
      if (value.startsWith('GD') && cvalue >= 500) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
      if (value.startsWith('HA') && cvalue < 500) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
      if (cvalue % 97 !== parseInt(value.substr(9, 2), 10)) {
        return { isValid: false, error: new exceptions.InvalidChecksum() };
      }
    } else if (value.length === 9 || value.length === 12) {
      if (!strings.isdigits(value)) {
        return { isValid: false, error: new exceptions.InvalidFormat() };
      }
      const sum = weightedSum(value.substr(0, 9), {
        weights: [8, 7, 6, 5, 4, 3, 2, 10, 1],
        modulus: 97,
      });
      if (Number(value.substring(0, 3)) >= 100) {
        if (![0, 42, 55].includes(sum)) {
          return { isValid: false, error: new exceptions.InvalidChecksum() };
        }
      } else if (sum !== 0) {
        return { isValid: false, error: new exceptions.InvalidChecksum() };
      }
    } else {
      return { isValid: false, error: new exceptions.InvalidLength() };
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

/**
 * Registrikood (Estonian organisation registration code).
 *
 * All organisations are assigned a unique tax identification code from the
 * commercial register, from the state register or from the non-profit
 * associations and foundations register. The code consists of 8 digits.
 *
 * Commercial company numbers start with a 1, schools and government numbers
 * with a 7, non-profit organisations with an 8 and foundations with a 9. The
 * number uses the same check digit algorithm as the Isikukood although that
 * fact is undocumented.
 *
 * Source
 *   https://ariregister.rik.ee/
 *   https://mtr.mkm.ee/
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { ikCheck } from './ik';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -/');
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
    if (value.length !== 8) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    if (!['1', '7', '8', '9'].includes(value[0])) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    if (!ikCheck(value)) {
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

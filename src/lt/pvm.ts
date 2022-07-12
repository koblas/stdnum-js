/**
 * PVM (Pridėtinės vertės mokestis mokėtojo kodas, Lithuanian VAT number).
 *
 * The PVM is used for VAT purposes in Lithuania. It is 9 digits (for legal
 * entities) or 12 digits long (for temporarily registered taxpayers). This
 * module does not check the format of Lithuanian personal codes (Asmens
 * kodas).
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { ikCheck } from '../ee/ik';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -', 'LT');
}

const impl: Validator = {
  name: 'Lithuanian VAT Number',
  localName: 'Pridėtinės Vertės Mokestis Mokėtojo Kodas',
  abbreviation: 'PVM Kodas',
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
    if (value.length !== 9 && value.length !== 12) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    if (value.length === 9 && value[7] !== '1') {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (value.length === 12 && value[10] !== '1') {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    if (!ikCheck(value)) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
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

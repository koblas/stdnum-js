/**
 * DNI (Documento Nacional de Identidad, Spanish personal identity codes).
 *
 * The DNI is a 9 digit number used to identify Spanish citizens. The last
 * digit is a checksum letter.
 *
 * Foreign nationals, since 2010 are issued an NIE (Número de Identificación
 * de Extranjeros, Foreigner's Identity Number) instead.
 *
 * Sources:
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

const checkDigits = 'TRWAGMYFPDXBNJZSQVHLCKE';

export function calcCheckDigit(value: string): string {
  return checkDigits[parseInt(value.substr(0, 8), 10) % 23];
}

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
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

    return strings.splitAt(value, 8).join('-');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 9) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    const [body, check] = strings.splitAt(value, 8);

    if (!strings.isdigits(body)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    if (calcCheckDigit(body) !== check) {
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

export const validate = impl.validate;
export const format = impl.format;
export const compact = impl.compact;

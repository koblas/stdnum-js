/**
 * NIF (Número de Identificação Fiscal, Angola Tax Identification Number).
 *
 * The Angolan NIF is a 10-digit or 14-character number used for tax purposes.
 *
 * Source:
 * https://validarnif.pt/pt/validar-nif-angola/
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input.toUpperCase(), ' -.');
}

const impl: Validator = {
  name: 'Angola Tax Identification Number',
  localName: 'Número de Identificação Fiscal',
  abbreviation: 'NIF',

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
    if (value.length === 10 && strings.isdigits(value)) {
      return {
        isValid: true,
        compact: value,
        isIndividual: false,
        isCompany: true,
      };
    }

    if (value.length === 14 && /^\d{9}[A-Z]{2}\d{3}$/.test(value)) {
      return {
        isValid: true,
        compact: value,
        isIndividual: true,
        isCompany: false,
      };
    }

    if (value.length !== 10 && value.length !== 14) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    return { isValid: false, error: new exceptions.InvalidFormat() };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

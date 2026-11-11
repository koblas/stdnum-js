/**
 * NIF (Número de Identificación Fiscal, Spanish VAT number).
 *
 * The Spanish VAT number is a 9-digit number where either the first, last
 * digits or both can be letters.
 * The number is either a DNI (Documento Nacional de Identidad, for
 *
 * Spaniards), a NIE (Número de Identificación de Extranjero, for
 * foreigners) or a CIF (Código de Identificación Fiscal, for legal
 * entities and others).
 *
 * VAT (PERSON/ENTITY)
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import * as nie from './nie';
import * as dni from './dni';
import * as cif from './cif';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  const [value, err] = strings.cleanUnicode(input, ' -./');

  if (err) {
    return [value, err];
  }
  if (value.startsWith('ES')) {
    return [value.slice(2), null];
  }

  return [value, null];
}

const impl: Validator = {
  name: 'Spanish VAT Number',
  localName: 'Número de Identificación Fiscal',
  abbreviation: 'NIF',
  examples: ['B58378431', '54362315K', 'X5253868R'],
  formats: ['c-nnnnnnnc'],
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 1).join('-');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 9) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    if ('KLM'.includes(value[0])) {
      // K: Spanish younger than 14 year old
      // L: Spanish living outside Spain without DNI
      // M: granted the tax to foreigners who have no NIE
      // these use the old checkdigit algorithm (the DNI one)
      if (!strings.isdigits(value.slice(1, -1))) {
        return { isValid: false, error: new exceptions.InvalidFormat() };
      }
      if (value[value.length - 1] !== dni.calcCheckDigit(value.slice(1))) {
        return { isValid: false, error: new exceptions.InvalidChecksum() };
      }
      return {
        isValid: true,
        compact: value,
        isIndividual: true,
        isCompany: false,
      };
    }
    if (strings.isdigits(value[0])) {
      // Natural resident (DNI)
      return dni.validate(value);
    }
    if ('XYZ'.includes(value[0])) {
      // Foreign natural person (NIE)
      return nie.validate(value);
    }

    // Otherwise it has to be a (CIF)
    return cif.validate(value);
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

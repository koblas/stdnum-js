/**
 * NIT (Número de Identificación Tributaria, Guatemala tax number).
 *
 * The Número de Identificación Tributaria (NIT) is an identifier of legal
 * entities for tax purposes in Guatemala.
 * The number consists of 2 to 12 characters, where the last one is the check
 * digit (a digit or the letter K) and the rest are digits. Leading zeroes are
 * usually omitted. Digits and check digit are usually separated with a hyphen.
 *
 * Source
 *    https://portal.sat.gob.gt/portal/descarga/6524/factura-electronica-fel/25542/fel-reglas-y-validaciones.pdf (page 58)
 *    https://portal.sat.gob.gt/portal/consulta-cui-nit/
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings, weightedSum } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const checkDigit = '0123456789K';

const impl: Validator = {
  name: 'Guatemala Tax Number',
  localName: 'Número de Identificación Tributaria',
  abbreviation: 'NIT',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, -1).join('-');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length < 2 || value.length > 12) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    const [front, check] = strings.splitAt(value, -1);
    if (!strings.isdigits(front)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    if (!checkDigit.includes(check)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const sum = 
      (11 -
        weightedSum(front, {
          reverse: true,
          weights: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
          modulus: 11,
        })) %
        11
    ;

    if (check !== checkDigit[sum]) {
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

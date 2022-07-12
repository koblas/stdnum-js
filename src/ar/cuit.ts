/**
 *
 * CUIT (Código Único de Identificación Tributaria, Argentinian tax number).
 *
 * The CUIT is a taxpayer identification number used for VAT (IVA, Impuesto al
 * Valor Agregado) and other taxes.
 *
 * Sources:
 *   https://es.wikipedia.org/wiki/Clave_Única_de_Identificación_Tributaria
 *
 * TAX PERSON/ENTITY
 */

import * as exceptions from '../exceptions';
import { ValidateReturn, Validator } from '../types';
import { strings, weightedSum } from '../util';

const cuitTypes = [
  // individuals
  '20',
  '23',
  '24',
  '27',
  // companies
  '30',
  '33',
  '34',
  // international purposes
  '50',
  '51',
  '55',
];

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const impl: Validator = {
  name: 'Argentinian VAT Number',
  localName: 'Código Único de Identificación Tributaria',
  abbreviation: 'CUIT',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 2, 10).join('-');
  },

  /**
   * Check if the number is a valid CUIT number.
   * This checks the length, formatting and other contraints. It does not check
   * for control letter.
   */
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

    const [front, body, check] = strings.splitAt(value, 2, 10);

    if (!cuitTypes.includes(front)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const cs = weightedSum(front + body, {
      weights: [5, 4, 3, 2, 7, 6, 5, 4, 3, 2],
      modulus: 11,
    });
    const digit = '012345678990'[11 - cs];

    if (digit !== check) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: front[0] === '2',
      isCompany: front[0] === '3',
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

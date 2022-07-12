/**
 *
 * Columbian Número de Identificación Tributaria
 *
 * The Tax Identification Number (NIT) is a unique Colombian number, assigned by the DIAN (Dirección
 * de Impuestos y Aduanas Nacionales de Colombia) when the entity is registered in the
 * RUT (Registro Único Tributario).
 *
 * Sources:
 *   https://es.wikipedia.org/wiki/N%C3%BAmero_de_Identificaci%C3%B3n_Tributaria
 *
 * PERSON/ENTITY
 */

import * as exceptions from '../exceptions';
import { strings, weightedSum } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ',.- ');
}

const impl: Validator = {
  name: 'Colombian Tax Identification Number',
  localName: 'Número de Identificación Tributaria',
  abbreviation: 'NIT',

  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value.toLocaleUpperCase();
  },

  format(input: string): string {
    const [value] = clean(input);

    const [p1, p2, p3, p4] = strings.splitAt(value, 3, 6, 9);

    return `${p1}.${p2}.${p3}-${p4}`;
  },

  /**
   * This checks the length, formatting and other contraints. It does not check
   * for control letter.
   */
  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length < 8 || value.length > 16) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const [front, check] = strings.splitAt(value, -1);
    const sum = weightedSum(front, {
      weights: [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71],
      reverse: true,
      modulus: 11,
    });

    const digit = '01987654321'[sum];
    if (check !== digit) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: true,
      isCompany: true,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

/**
 * CUI (Cédula Única de Identidad, Peruvian Personal Identification Card).
 *
 * The Cédula Única de Identidad is the unique identifier for persons that
 * appears on the Documento Nacional de Identidad (DNI), the national identity
 * document of Peru. The number consists of 8 digits and an optional extra check
 * digit.
 *
 * Source
 *    https://www.gob.pe/235-documento-nacional-de-identidad-dni
 *    https://es.wikipedia.org/wiki/Documento_Nacional_de_Identidad_(Perú)
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings, weightedSum } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const impl: Validator = {
  name: 'Peruvian Personal Identification Card',
  localName: 'Cédula Única de Identidad',
  abbreviation: 'CUI',

  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    if (value.length === 9) {
      return strings.splitAt(value, 8).join('-');
    }
    return value;
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 8 && value.length !== 9) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    if (value.length === 9) {
      const [front, check] = strings.splitAt(value, 8);
      const sum = weightedSum(front, {
        weights: [3, 2, 7, 6, 5, 4, 3, 2],
        modulus: 11,
      });

      const digits = ['65432110987'[sum], 'KJIHGFEDCBA'[sum]];

      if (!digits.includes(check)) {
        return { isValid: false, error: new exceptions.InvalidChecksum() };
      }
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: true,
      isCompany: false,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

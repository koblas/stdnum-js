/**
 * RUT (Registro Único Tributario, Uruguay tax number).
 *
 * The Registro Único Tributario (RUT) is an identifier of legal entities for
 * tax purposes.
 *
 * This number consists of 12 digits, the first two indicate the registration
 * number, followed by a 6 digit sequence number, followed by 001 and a check
 * digit.
 *
 * Source
 *    https://www.agesic.gub.uy/innovaportal/file/1634/1/modelo_de_datos.pdf (page 71)
 *    https://servicios.dgi.gub.uy/ServiciosEnLinea/dgi--servicios-en-linea--consulta-de-certifcado-unico
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings, weightedSum } from '../util';
import { Validator, ValidateReturn } from '../types';
import { pymod } from '../util/pymod';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  const [value, err] = strings.cleanUnicode(input, ' -');
  if (err) {
    return [value, err];
  }
  if (value.startsWith('UY')) {
    return [value.substr(2), null];
  }
  return [value, err];
}

const impl: Validator = {
  name: 'Uruguayan Tax Number',
  localName: 'Registro Único Tributario',
  abbreviation: 'RUT',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 2, -4, -1).join('-');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 12) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    if (parseInt(value.substr(0, 2), 10) > 21 || value.substr(0, 2) === '00') {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (value.substr(2, 6) === '000000') {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (value.substr(8, 3) !== '001') {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const [front, check] = strings.splitAt(value, 11);

    const sum = weightedSum(front, {
      weights: [4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2],
      modulus: 11,
    });

    const digit = String(pymod(-sum, 11));

    if (check !== digit) {
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

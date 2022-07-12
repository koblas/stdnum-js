/**
 * NIT (Número de Identificación Tributaria, El Salvador tax number).
 *
 * This number consists of 14 digits, usually separated into four groups
 * using hyphens to make it easier to read, like XXXX-XXXXXX-XXX-X.
 *
 * The first four digits indicate the code for the municipality of birth
 * for natural persons or the municipality of stablishment for juridical
 * persons. NIT for El Salvador nationals begins with either 0 or 1, and
 * for foreigners it begins with 9.
 *
 * The following six digits indicate the date of birth for the natural
 * person, or the stablishment date for the juridical person, using the
 * format DDMMYY, where DD is the day, MM is the month, and YY is the
 * year. For example XXXX-051180-XXX-X is (November 5 1980)
 *
 * The next 3 digits are a sequential number.
 *
 * The last digit is the check digit, which is used to verify the number
 * was correctly typed.
 *
 * Source
 *    https://es.wikipedia.org/wiki/Identificaci%C3%B3n_tributaria
 *    https://www.listasal.info/articulos/nit-el-salvador.shtml
 *    https://tramitesyrequisitos.com/el-salvador/nit/#Estructura_del_NIT
 *    https://www.svcommunity.org/forum/programacioacuten/como-calcular-digito-verificador-del-dui-y-nit/msg951882/#msg951882
 *
 * PERSON/ENTITY
 */

import * as exceptions from '../exceptions';
import { strings, weightedSum } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  const [value, err] = strings.cleanUnicode(input, ' -');

  if (err !== null) {
    return [value, err];
  }
  if (value.startsWith('SV')) {
    return [value.substr(2), err];
  }

  return [value, err];
}

const impl: Validator = {
  name: 'El Salvador Tax Number',
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

    return strings.splitAt(value, 4, -4, -1).join('-');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 14) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    if (!['0', '1', '9'].includes(value[0])) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    let sum;
    const [front, check] = strings.splitAt(value, 13);

    if (value.substr(10, 3) === '100') {
      sum =
        weightedSum(front, {
          weights: [14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2],
          modulus: 11,
        }) % 10;
    } else {
      sum =
        (11 -
          weightedSum(front, {
            weights: [2, 7, 6, 5, 4, 3, 2, 7, 6, 5, 4, 3, 2],
            modulus: 11,
          })) %
        10;
    }

    if (check !== String(sum)) {
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

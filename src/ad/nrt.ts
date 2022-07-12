/**
 * NRT (Número de Registre Tributari, Andorra tax number).
 *
 * The Número de Registre Tributari (NRT) is an identifier of legal and natural
 * entities for tax purposes.
 *
 * This number consists of one letter indicating the type of entity, then 6
 * digits, followed by a check letter.
 *
 * More information:
 * https://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/Andorra-TIN.pdf
 *
 * PERSON/ENTITY
 */

import * as exceptions from '../exceptions';
import { ValidateReturn, Validator } from '../types';
import { strings } from '../util';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -.');
}

const impl: Validator = {
  name: 'Andorra Tax Register Number',
  localName: 'Número de Registre Tributari',
  abbreviation: 'NRT',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value.toLocaleUpperCase();
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 1, 7).join('-');
  },

  /**
   * Check if the number is a valid Andorra NRT number.
   * This checks the length, formatting and other contraints. It does not check
   * for control letter.
   */
  validate(value: string): ValidateReturn {
    const [v, error] = clean(value);

    if (error) {
      return { isValid: false, error };
    }
    if (v.length !== 8) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    const mid = v.substr(1, v.length - 2);

    if (!strings.isalpha(v[0]) || !strings.isalpha(v[v.length - 1])) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    if (!strings.isdigits(mid)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    if (!'ACDEFGLOPU'.includes(v[0])) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (v[0] === 'F' && mid > '699999') {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if ('AL'.includes(v[0]) && mid > '699999' && mid < '800000') {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    return {
      isValid: true,
      compact: v,
      isIndividual: 'FE'.includes(v[0]),
      isCompany: !'FE'.includes(v[0]),
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

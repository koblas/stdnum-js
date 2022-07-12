/**
 * CNPJ (Cadastro Nacional da Pessoa Jurídica, Brazilian company identifier).
 *
 * Numbers from the national register of legal entities have 14 digits. The
 * first 8 digits identify the company, the following 4 digits identify a
 * business unit and the last 2 digits are check digits.
 *
 * Sources:
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./');
}

function computeDigit(input: string): number {
  const mlen = input.length + 7;

  const value =
    11 -
    (input
      .split('')
      .map((v, idx) => parseInt(v, 10) * (((mlen - idx) % 8) + 2))
      .reduce((acc, v) => acc + v) %
      11);

  return value > 9 ? 0 : value;
}

const impl: Validator = {
  name: 'Brazilian Company Identifier',
  localName: 'Cadastro Nacional da Pessoa Jurídica',
  abbreviation: 'CNPJ',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    const [a, b, c, d, e] = strings.splitAt(value, 2, 5, 8, 12);

    return `${a}.${b}.${c}/${d}-${e}`;
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

    const [front, c1, c2] = strings.splitAt(value, 12, 13);

    const d1 = String(computeDigit(front));
    const d2 = String(computeDigit(value.substr(0, 13)));

    if (d1 !== c1 || d2 !== c2) {
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

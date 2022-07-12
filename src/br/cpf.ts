/**
 * CPF (Cadastro de Pessoas Físicas, Brazilian national identifier).
 *
 * The Cadastro de Pessoas Físicas is the Brazilian identification number
 * assigned to individuals for tax purposes. The number consists of 11 digits
 * and includes two check digits.
 *
 * Source
 *     https://en.wikipedia.org/wiki/Cadastro_de_Pessoas_Físicas
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -.');
}

function computeDigit(input: string): number {
  const mlen = input.length + 1;

  const value = input
    .split('')
    .map((v, idx) => parseInt(v, 10) * (mlen - idx))
    .reduce((acc, v) => (acc + v) % 11);

  return value < 2 ? 0 : 11 - value;
}

const impl: Validator = {
  name: 'Brazilian National Identifier',
  localName: 'Cadastro de Pessoas Físicas',
  abbreviation: 'CPF',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    const [a, b, c, d] = strings.splitAt(value, 3, 6, input.length - 2);

    return `${a}.${b}.${c}-${d}`;
  },

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

    const [front, c1, c2] = strings.splitAt(value, 9, 10);

    const d1 = String(computeDigit(front));
    const d2 = String(computeDigit(value.substr(0, 10)));

    if (d1 !== c1 || d2 !== c2) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
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

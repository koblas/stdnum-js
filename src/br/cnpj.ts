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
import { Validator, ValidateReturn } from '../types/types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./');
}

function charToValue(char: string): number {
  return char.charCodeAt(0) - 48;
}

function calculateDigit(base: string, pesos: number[]): number {
  let sum = 0;

  for (let i = 0; i < base.length; i++) {
    sum += charToValue(base[i]) * pesos[i];
  }

  const rest = sum % 11;
  return rest < 2 ? 0 : 11 - rest;
}

function generateCheckDigits(valueWithoutDigits: string): string | exceptions.InvalidLength {
  if (valueWithoutDigits.length !== 12) {
    return new exceptions.InvalidLength();
  }

  const base = valueWithoutDigits.toUpperCase();

  const weightFirstDigit: number[] = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weightSecondDigit: number[] = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const firstDigit = calculateDigit(base, weightFirstDigit);
  const baseWithFirstDigit = base + firstDigit.toString();

  const secondDigit = calculateDigit(baseWithFirstDigit, weightSecondDigit);

  return `${firstDigit}${secondDigit}`;
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

    if (!strings.isAlphanumeric(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    if (value.length !== 14) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    const cleaned = value.toUpperCase();

    const base = cleaned.slice(0, 12);
    const informedCheckDigits = cleaned.slice(12);

    const checkDigitsCalculated = generateCheckDigits(base);
    if (checkDigitsCalculated instanceof exceptions.InvalidLength) {
      return { isValid: false, error: checkDigitsCalculated };
    }

    if (informedCheckDigits !== checkDigitsCalculated) {
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

export const { name, localName, abbreviation, validate, format, compact } = impl;

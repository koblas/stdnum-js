/**
 * NUIT (Número Único de Identificação Tributária, Mozambican tax identifier).
 *
 * The Número Único de Identificação Tributária is the Mozambican tax
 * identification number assigned to individuals and legal entities for
 * fiscal purposes. It consists of 9 digits: 8 base digits and 1 check digit.
 *
 * The check digit is calculated using a modulo 11 algorithm with weights
 * 8, 9, 4, 5, 6, 7, 8, 9 (left to right). The result is mapped as:
 *   check = sum % 11
 *   digit = '01234567891'[check]  (so 10 -> 1)
 *
 * Source:
 *     https://www.at.gov.mz/ (Autoridade Tributária de Moçambique)
 *
 * PERSON / COMPANY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -.');
}

function computeCheckDigit(input: string): string {
  // input must be 8 digits
  const weights = [8, 9, 4, 5, 6, 7, 8, 9];
  const sum = input
    .split('')
    .map((v, i) => parseInt(v, 10) * weights[i])
    .reduce((acc, v) => acc + v, 0);

  const remainder = sum % 11;
  return '01234567891'[remainder];
}

const impl: Validator = {
  name: 'Mozambican Tax Identification Number',
  localName: 'Número Único de Identificação Tributária',
  abbreviation: 'NUIT',

  compact(input: string): string {
    const [value, err] = clean(input);
    if (err) {
      throw err;
    }
    return value;
  },

  format(input: string): string {
    const [value] = clean(input);
    return strings.splitAt(value, 3, 6).join(' ');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);
    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 9) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [base, dv] = strings.splitAt(value, 8);
    const expectedDv = computeCheckDigit(base);

    if (dv !== expectedDv) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: true, // NUIT can belong to individuals or companies
      isCompany: true, // so both flags are true
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

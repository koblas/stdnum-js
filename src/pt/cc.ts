/**
 * CC (Número de Cartão de Cidadão, Portuguese Identity number).
 *
 * The Portuguese Identity Number is alphanumeric and consists of the numeric
 * Número de Identificação Civil, a two-letter version and a check digit.
 *
 * Source
 *   https://pt.wikipedia.org/wiki/Cartão_de_cidadão
 *   https://www.autenticacao.gov.pt/documents/20126/115760/Validação+de+Número+de+Documento+do+Cartão+de+Cidadão.pdf
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types/types';
import { luhnChecksumValidate } from '../util/checksum';

const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const validRe = /^\d{9}[A-Z0-9]{2}\d$/i;

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' ');
}

const impl: Validator = {
  name: 'Portuguese Identity number',
  localName: 'Número de Cartão de Cidadão',
  abbreviation: 'CC',

  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 8, 9).join(' ');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 12) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!validRe.test(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    if (!luhnChecksumValidate(value, ALPHABET)) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: '1234'.includes(value[0]),
      isCompany: !'1234'.includes(value[0]),
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } = impl;

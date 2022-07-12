/**
 * NIF (Número de identificação fiscal, Portuguese VAT number).
 *
 * The NIF (Número de identificação fiscal, NIPC, Número de Identificação de
 * Pessoa Colectiva) is used for VAT purposes. It is a 9-digit number with a
 * simple checksum. The first digit depends on what the number refers to,
 * e.g.: 1-3 are regular people, 5 are companies.
 *
 * Source
 * https://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/Portugal-TIN.pdf
 *
 * PERSON/ENTITY
 */

import * as exceptions from '../exceptions';
import { strings, weightedSum } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -.', 'PT');
}

const impl: Validator = {
  name: 'Portuguese Tax Identification Number',
  localName: 'Número de Identificação Fiscal',
  abbreviation: 'NIF',

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
    if (!strings.isdigits(value) || value[0] === '0') {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [front, check] = strings.splitAt(value, -1);

    const sum = weightedSum(front, {
      weights: [9, 8, 7, 6, 5, 4, 3, 2, 1],
      modulus: 11,
    });

    if (String((11 - sum) % 10) !== check) {
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

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

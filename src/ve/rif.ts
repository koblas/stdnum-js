/**
 * RIF (Registro de Identificación Fiscal, Venezuelan VAT number).
 *
 * The Registro de Identificación Fiscal (RIF) is the Venezuelan fiscal
 * registration number. The number consists of 10 digits where the first digit
 * denotes the type of number (person, company or government) and the last digit
 * is a check digit.
 *
 * Source
 *
 * VAT
 */

import * as exceptions from '../exceptions';
import { strings, weightedSum } from '../util';
import { Validator, ValidateReturn } from '../types';

//  Known number types and their corresponding value in the check
//  digit calculation
const companyTypes = {
  V: 4, // natural person born in Venezuela
  E: 8, // foreign natural person
  J: 12, // company
  P: 16, // passport
  G: 20, // government
};

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const impl: Validator = {
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 1, 9).join('-');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 10) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value.substr(1))) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    const [ctype, body, check] = strings.splitAt(value, 1, 9);
    const first = companyTypes[ctype];
    if (first === undefined) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const digit =
      (first +
        weightedSum(body, {
          weights: [3, 2, 7, 6, 5, 4, 3, 2],
          modulus: 11,
        })) %
      11;

    if ('00987654321'[digit] !== check) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: true,
      isEntity: false,
    };
  },
};

export const { name, localizedName, validate, format, compact } = impl;

/**
 * ИНН (Идентификационный номер налогоплательщика, Russian tax identifier). (aka INN)
 *
 * The Indentifikatzionny nomer nalogoplatel'shchika is a Russian tax
 * identification number that consists 10 digits for companies and 12 digits for
 * persons.
 *
 * More information:
 *    https://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/RussianFederation-TIN.pdf
 *
 * INN == VAT PERSON/ENTITY
 */

import * as exceptions from '../exceptions';
import { strings, weightedSum } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' ');
}

const impl: Validator = {
  name: 'Russian Tax Identifier',
  localName: 'Идентификационный номер налогоплательщика',
  abbreviation: 'ИНН',

  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value.toLocaleUpperCase();
  },

  format(input: string): string {
    const [value] = clean(input);

    return value;
  },

  /**
   * Check if the number is a valid INN number.
   * This checks the length, formatting and other contraints. It does not check
   * for control letter.
   */
  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 10 && value.length !== 12) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    let digit: string;
    const [front, check] = strings.splitAt(
      value,
      value.length === 10 ? -1 : -2,
    );

    if (value.length === 10) {
      digit = String(
        weightedSum(front, {
          weights: [2, 4, 10, 3, 5, 9, 4, 6, 8],
          modulus: 11,
        }) % 10,
      );
    } else {
      const d1 = String(
        weightedSum(front, {
          weights: [7, 2, 4, 10, 3, 5, 9, 4, 6, 8],
          modulus: 11,
        }) % 10,
      );
      const d2 = String(
        weightedSum(front + d1, {
          weights: [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8],
          modulus: 11,
        }) % 10,
      );

      digit = `${d1}${d2}`;
    }

    if (digit !== check) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: value.length === 12,
      isCompany: value.length === 10,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

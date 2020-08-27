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
 * INN == VAT
 */

import * as exceptions from "../exceptions";
import { isdigits, cleanUnicode, weightedChecksum } from "../util";
import { Validator, ValidateReturn } from "../types";

function clean(input: string): ReturnType<typeof cleanUnicode> {
  return cleanUnicode(input, " ");
}

class InnSingleton implements Validator {
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value.toLocaleUpperCase();
  }

  format(input: string): string {
    return this.compact(input);
  }

  /**
   * Check if the number is a valid Andorra NRT number.
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

    if (!isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    let digit: string;

    if (value.length === 10) {
      const d1 = (weightedChecksum(value, [2, 4, 10, 3, 5, 9, 4, 6, 8]) % 11) % 10;

      digit = `${d1}`;
    } else {
      const d1 = (weightedChecksum(value, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]) % 11) % 10;
      const d2 = (weightedChecksum(value.substr(0, 10) + d1, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]) % 11) % 10;

      digit = `${d1}${d2}`;
    }

    if (digit !== value.substr(value.length - digit.length)) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: value.length === 10,
      isCompany: value.length === 12,
    };
  }
}

export const Inn = new InnSingleton();
export const validate = Inn.validate;
export const format = Inn.format;
export const compact = Inn.compact;

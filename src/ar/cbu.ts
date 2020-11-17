/**
 *
 * CBU (Clave Bancaria Uniforme, Argentine bank account number).
 *
 * CBU it s a code of the Banks of Argentina to identify customer accounts. The
 * number consists of 22 digits and consists of a 3 digit bank identifier,
 * followed by a 4 digit branch identifier, a check digit, a 13 digit account
 * identifier and another check digit.
 *
 * Sources:
 *   https://es.wikipedia.org/wiki/Clave_Bancaria_Uniforme
 *
 * BANK
 */

import * as exceptions from "../exceptions";
import { strings, weightedChecksum } from "../util";
import { Validator, ValidateReturn } from "../types";

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, " -");
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
    const [a, b] = strings.splitAt(value, 8);

    return `${a} ${b}`;
  },

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
    if (value.length !== 22) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const [front, c1, back, c2] = strings.splitAt(value, 7, 8, 21);

    const s1 = String(10 - weightedChecksum(strings.reverse(front), [3, 1, 7, 9, 3, 1, 7], 10));
    const s2 = String(10 - weightedChecksum(strings.reverse(back), [3, 1, 7, 9, 3, 1, 7, 9, 3, 1, 7, 9, 3, 1], 10));

    if (s1 !== c1) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }
    if (s2 !== c2) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: false,
      isCompany: false,
    };
  },
};

export const validate = impl.validate;
export const format = impl.format;
export const compact = impl.compact;

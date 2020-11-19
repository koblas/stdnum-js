/**
 *
 * Austrian Company Register Numbers.
 *
 * Sources:
 *
 */

import * as exceptions from "../exceptions";
import { strings } from "../util";
import { Validator, ValidateReturn } from "../types";

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  let [value, err] = strings.cleanUnicode(input, " -./");

  if (err) {
    return [value, err];
  }

  if (value.startsWith("FN")) {
    value = value.substring(2);
  }

  return [value, null];
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

    return value;
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
    if (!/^\d+[A-Z]$/.test(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
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

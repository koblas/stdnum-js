/**
 * РНОКПП, RNTRC (Individual taxpayer registration number in Ukraine).
 *
 * The РНОКПП (Реєстраційний номер облікової картки платника податків,
 * registration number of the taxpayer's registration card) is a unique
 * identification number that is provided to individuals within Ukraine. The
 * number consists of 10 digits, the last being a check digit.
 *
 * More information:
 *    https://uk.wikipedia.org/wiki/РНОКПП
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings, weightedSum } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' ');
}

const impl: Validator = {
  name: "Ukrainian Registration Number of the Taxpayer's Registration Card",
  localName: 'Реєстраційний номер облікової картки платника податків',
  abbreviation: 'РНОКПП',
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

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 10) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [front, check] = strings.splitAt(value, -1);

    const sum = weightedSum(front, {
      weights: [-1, 5, 7, 9, 4, 6, 10, 5, 7],
      modulus: 11,
    });

    if (String(sum % 10) !== check) {
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

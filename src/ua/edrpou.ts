/**
 * ЄДРПОУ, EDRPOU (Identifier for enterprises and organizations in Ukraine).
 *
 * The ЄДРПОУ (Єдиного державного реєстру підприємств та організацій України,
 * Unified State Register of Enterprises and Organizations of Ukraine) is a
 * unique identification number of a legal entities in Ukraine. Th number
 * consists of 8 digits, the last being a check digit.
 *
 * Source:
 *   https://uk.wikipedia.org/wiki/Код_ЄДРПОУ
 *   https://1cinfo.com.ua/Articles/Proverka_koda_po_EDRPOU.aspx
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings, weightedSum } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' ');
}

const impl: Validator = {
  name: 'Ukrainian Unified State Register of Enterprises and Organizations',
  localName: 'Єдиного державного реєстру підприємств та організацій України',
  abbreviation: 'ЄДРПОУ',
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
    if (value.length !== 8) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [front, check] = strings.splitAt(value, -1);

    const weights = '345'.includes(front[0])
      ? [7, 1, 2, 3, 4, 5, 6]
      : [1, 2, 3, 4, 5, 6, 7];

    let sum = weightedSum(front, {
      weights,
      modulus: 11,
    });

    if (sum === 10) {
      sum = weightedSum(front, {
        weights: weights.map(v => v + 2),
        modulus: 11,
      });
    }
    if (String(sum) !== check) {
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

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

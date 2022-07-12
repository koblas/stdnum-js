/**
 * CN (法人番号, hōjin bangō, Japanese Corporate Number).
 *
 * The Corporate Number is assigned by the Japanese National Tax Agency to
 * identify government organs, public entities, registered corporations and
 * other organisations. The number consists of 13 digits where the first digit
 * is a non-zero check digit.
 *
 * More information:
 * https://en.wikipedia.org/wiki/Corporate_Number
 * https://www.nta.go.jp/taxes/tetsuzuki/mynumberinfo/houjinbangou/
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { weightedSum } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const impl: Validator = {
  name: 'Japanese Corporate Number',
  localName: '法人番号 (hōjin bangō)',
  abbreviation: 'CN',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 1, 5, 9).join('-');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 13) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    const [check, rest] = strings.splitAt(value, 1);

    const sum = weightedSum(rest, {
      modulus: 9,
      reverse: true,
      weights: [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
    });

    if (String(9 - sum) !== check) {
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

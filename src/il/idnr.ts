/**
 * Identity Number (Mispar Zehut, מספר זהות, Israeli identity number).
 *
* The identity number (Mispar Zehut, מספר זהות) is issued at birth to Israeli
* citizens. The number consists of nine digits and includes a check digit.

* Source
*   https://en.wikipedia.org/wiki/National_identification_number#Israel
*   https://en.wikipedia.org/wiki/Israeli_identity_card
*   https://he.wikipedia.org/wiki/מספר_זהות_(ישראל)
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { luhnChecksumValidate } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const impl: Validator = {
  name: 'Israeli Identify Number',
  localName: 'Mispar Zehut, מספר זהות',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, -1).join('-');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length > 9) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    if (!luhnChecksumValidate(value.padStart(9, '0'))) {
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

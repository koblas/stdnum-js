/**
 * TFN (Australian Tax File Number).
 *
 * The Tax File Number (TFN) is issued by the Australian Taxation Office (ATO)
 * to taxpaying individuals and organisations. A business has both a TFN and an
 * Australian Business Number (ABN).
 *
 * The number consists of 8 (older numbers) or 9 digits and includes a check
 * digit but otherwise without structure.
 *
 * More information:
 *   https://en.wikipedia.org/wiki/Tax_file_number
 *   https://www.ato.gov.au/Individuals/Tax-file-number/
 *
 * PERSON/ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { weightedSum } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' ');
}

const impl: Validator = {
  name: 'Australian Tax File Number',
  localName: 'Tax File Number',
  abbreviation: 'TFN',
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
    if (value.length !== 8 && value.length !== 9) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const sum = weightedSum(value, {
      modulus: 11,
      weights: [1, 4, 3, 7, 5, 8, 6, 9, 10],
    });

    if (sum !== 0) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: true,
      isCompany: true,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

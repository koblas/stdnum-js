/**
 * Y-tunnus (Finnish business identifier).
 *
 *  The number is an 8-digit code with a weighted checksum.
 *
 * ENTITY
 */

import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { validate as alvValidate } from './alv';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const impl: Validator = {
  name: 'Finnish Business Identifier',
  localName: 'Yritys- ja yhteisötunnus',
  abbreviation: 'Y-tunnus',
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

    return alvValidate(value);
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

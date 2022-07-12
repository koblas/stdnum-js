/**
 * PEID (Liechtenstein tax code for individuals and entities).
 *
 * The Personenidentifikationsnummer (PEID) is an numeric code up to 12 digits
 * used to identify entities and individuals residing in Liechtenstein.
 *
 * Source:
 *    https://www.oera.li/
 *    https://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/LIECHTENSTEIN%20TIN.pdf
 *
 * PERSON/ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  const [value, error] = strings.cleanUnicode(input, ' .');

  if (error) {
    return [value, error];
  }

  return [value.replace(/^0+/, ''), null];
}

const impl: Validator = {
  name: 'Liechtenstein Tax Code',
  localName: 'Personenidentifikationsnummer',
  abbreviation: 'PEID',
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
    if (value.length < 4 || value.length > 12) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
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

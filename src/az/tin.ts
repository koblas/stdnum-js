/**
 * Vergi identifikasiya nömrəsi (VÖEN) - Azerbaijani Tax Identification Number
 *
 * Source
 *   https://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/Azerbaijan-TIN.pdf
 *   https://www.currentschoolnews.com/az/articles/tax-identification-number-application/
 *
 * PERSON/ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const impl: Validator = {
  name: 'Azerbaijani Tax Identification Number',
  localName: 'Vergi Identifikasiya Nömrəsi',
  abbreviation: 'VÖEN',
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

    const last = value[9];
    if (!['1', '2'].includes(last)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: last === '2',
      isCompany: last === '1',
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

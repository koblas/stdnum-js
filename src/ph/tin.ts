/**
 * TIN (Taxpayer Identification Number).
 *
 * Source
 *   https://orus.ph/tin-format/
 *   https://lookuptax.com/docs/tax-identification-number/philippines-tax-id-guide
 *   https://taxdo.com/resources/global-tax-id-validation-guide/philippines
 *   https://github.com/arthurdejong/python-stdnum/issues/116
 *   https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/10/49676
 *
 * PERSON / ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^\d{9}(\d{3})?$/;

const impl: Validator = {
  name: 'Taxpayer Identification Number',
  localName: 'Taxpayer Identification Number',
  abbreviation: 'TIN',
  examples: ['123456789', '123456789000'],
  formats: ['nnnnnnnnn', 'nnnnnnnnnnnn'],

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

    if (value.length < 9 || value.length > 12) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    const match = value.match(idRegexp);
    if (!match) {
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

export const {
  name,
  localName,
  abbreviation,
  examples,
  formats,
  validate,
  format,
  compact,
} = impl;

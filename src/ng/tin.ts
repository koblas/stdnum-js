/**
 * TIN (Tax Identification Number).
 *
 * Source
 *   https://www.oecd.org/content/dam/oecd/en/topics/policy-issue-focus/aeoi/nigeria-tin.pdf
 *   https://taxid.pro/docs/countries/nigeria
 *   https://taxdo.com/resources/global-tax-id-validation-guide/nigeria
 *   https://www.firs.gov.ng/individual-income-tax
 *   https://apps.firs.gov.ng/tinverification/
 *
 * PERSON / ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^\d{10}$/;

const impl: Validator = {
  name: 'Tax Identification Number',
  localName: 'Tax Identification Number',
  abbreviation: 'TIN',
  examples: ['1234567890'],
  formats: ['nnnnnnnnnn'],

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

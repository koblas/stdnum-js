/**
 * TRN (Taxpayer Registration Number).
 *
 * Source
 *   https://www.oecd.org/content/dam/oecd/en/topics/policy-issue-focus/aeoi/jamaica-tin.pdf
 *   https://www.jamaicatax.gov.jm/trn1/
 *   https://www.jamaicatax.gov.jm/taxpayer-registration-number-trn-faq
 *   https://taxdo.com/resources/global-tax-id-validation-guide/jamaica
 *   https://lookuptax.com/docs/tax-identification-number/jamaica-tax-id-guide
 *
 * PERSON / ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^\d{9}$/;

const impl: Validator = {
  name: 'Taxpayer Registration Number',
  localName: 'Taxpayer Registration Number',
  abbreviation: 'TRN',
  examples: ['123456789'],
  formats: ['nnnnnnnnn'],

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

    if (value.length !== 9) {
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

/**
 * BIR (Board of Inland Revenue Number).
 *
 * Source
 *   https://www.ird.gov.tt/BIR_number
 *   https://www.finance.gov.tt/services/income-tax/applying-for-bir-file-and-paye-number/
 *   https://taxdo.com/resources/global-tax-id-validation-guide/trinidad-and-tobago
 *   https://tin-check.com/en/trinidad-and-tobago/
 *   https://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/Trinidad-and-Tobago-TIN.pdf
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
  name: 'Board of Inland Revenue Number',
  localName: 'Board of Inland Revenue file number',
  abbreviation: 'BIR',

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

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

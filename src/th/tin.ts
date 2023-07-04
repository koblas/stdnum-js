/**
 * TIN (Thailand Taxpayer Identification Number).
 *
 * The Taxpayer Identification Number is used for tax purposes in the Thailand.
 * This number consists of 13 digits which the last is a check digit.
 * Personal income taxpayers use Personal Identification Number (IDNR) while
 * companies use Memorandum of Association (MOA).
 *
 * Source
 *
 * ENTITY/PERSON
 */

import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import * as idnr from './idnr';
import * as moa from './moa';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const impl: Validator = {
  name: 'Thailand Taxpayer Identification Number',
  localName: '',
  abbreviation: 'TIN',

  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    if (idnr.validate(input).isValid) {
      return idnr.format(input);
    }
    return moa.format(input);
  },

  validate(input: string): ValidateReturn {
    const v1 = idnr.validate(input);
    if (v1.isValid) {
      return v1;
    }

    return moa.validate(input);
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

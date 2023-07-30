/**
 * PST (Canadian BC Provincial Sales Tax)
 *
 * 3 alphanumeric (PST)
 * 8 digits
 *
 * Source
 *   https://wiki.scn.sap.com/wiki/display/CRM/Canada
 *   https://www2.gov.bc.ca/gov/content/taxes/sales-taxes/pst/register
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const validRe = /^PST\d{8}$/;

// const ALPHABET = '0123456789X';

const impl: Validator = {
  name: 'Provincial Sales Tax',
  localName: '',
  abbreviation: 'PST',

  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 3, 7).join('-');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 11) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    if (!validRe.test(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: false,
      isCompany: true,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

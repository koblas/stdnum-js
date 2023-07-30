/**
 * QST (Quebec Sales Tax Number).
 *
 * DESCRIPTION
 *   10 digits - Business number to identify the business. It is the Bussines Number.
 *   2 alpha - QT / TQ (unclear)
 *   4 digits - Serial number
 *
 * Source
 *    https://www5.services.mrq.gouv.qc.ca/mrqanonyme/g1/g1c/g1c1a_I_ValidationNoTVQ/PageIdentificationNoTVQ.aspx
 *    https://wiki.scn.sap.com/wiki/display/CRM/Canada
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { weightedSum } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const validRe = /^\d{10}[a-z]{2}\d{4}$/i;

// const ALPHABET = '0123456789X';

const impl: Validator = {
  name: 'Quebec Sales Tax Number',
  localName: '',
  abbreviation: 'QST',

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
    if (value.length !== 16) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    if (!validRe.test(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [front, check, , serial] = strings.splitAt(value, 9, 10, 12);
    if (serial === '0000') {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const sum = weightedSum(front, {
      weights: [4, 3, 2, 7, 6, 5, 4, 3, 2],
      modulus: 11,
    });

    if (String((11 - sum) % 10) !== check) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
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

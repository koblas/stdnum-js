/**
 * Azerbaijani Passport Number (Azərbaycan pasportu).
 *
 * Format: Nine-character alphanumeric. Commonly one letter followed by eight digits (e.g. the MRZ document-number example X05000107), or two letters followed by seven digits (e.g. AZE/AA series for diplomatic/service).
 *
 * Source
 *   https://en.wikipedia.org/wiki/Azerbaijani_passport
 *   https://terminology.hl7.org/6.4.0/NamingSystem-passportNumNS-AZE.html
 *   https://regulaforensics.com/blog/azerbaijani-passport-processing/
 *   https://www.consilium.europa.eu/prado/en/AZE-AO-02002/index.html
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]\d{8}$|^[A-Z]{2}\d{7}$/;

const impl: Validator = {
  name: 'Azerbaijani Passport Number',
  localName: 'Azərbaycan pasportu',
  abbreviation: 'Passport',

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
      isCompany: false,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

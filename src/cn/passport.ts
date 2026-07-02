/**
 * Chinese Passport Number (中国护照).
 *
 * Format: Chinese passport. Ordinary (old) passports: 'G' + 8 digits (e.g. G12345678). Public-affairs: 'P' + 8 digits. Electronic ordinary passports: original 'E' + 8 digits (E12345678); since April 2017 the extended format is 'E' + a sequential letter (excluding I and O) + 7 digits (e.g. EA1234567), keeping 9 total characters.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Chinese_passport
 *   https://www.fragomen.com/insights/understanding-the-chinese-e-passport.html
 *   https://capetown.china-consulate.gov.cn/eng/lsqz/consularlawsandregulations/lawsandregulationsaboutpassport/200611/t20061102_6620811.htm
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^(?:[GP]\d{8}|E[A-HJ-NP-Z]?\d{7,8})$/;

const impl: Validator = {
  name: 'Chinese Passport Number',
  localName: '中国护照',
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

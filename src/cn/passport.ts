/**
 * Chinese Passport Number (中国护照).
 *
 * Format: Chinese passport, 9 characters. Ordinary: 'G' + 8 digits, or electronic 'E' + 8 digits and, since April 2017, 'E' + a letter (excluding I and O) + 7 digits (e.g. EA1234567). Official/diplomatic/service: 'P', 'D' or 'S' + 8 digits, and electronic 'PE', 'DE' or 'SE' + 7 digits (e.g. PE1234567).
 *
 * Source
 *   https://www.thepaper.cn/newsDetail_forward_4186634
 *   https://sanctionslist.ofac.treas.gov/Home/SdnList (OFAC SDN list: format cross-check)
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

const idRegexp = /^(?:[GDSP]\d{8}|[DSP]E\d{7}|E[A-HJ-NP-Z0-9]\d{7})$/;

const impl: Validator = {
  name: 'Chinese Passport Number',
  localName: '中国护照',
  abbreviation: 'Passport',
  examples: ['EA1234567', 'G12345678'],
  formats: ['acnnnnnnn'],

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

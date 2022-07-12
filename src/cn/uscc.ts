/**
 * USCC (Unified Social Credit Code, 统一社会信用代码, China tax number).
 *
 * This number consists of 18 digits or uppercase English letters (excluding the
 * letters I, O, Z, S, V). The number is comprised of several parts:
 *
 *   Digit 1 represents the registering authority,
 *   Digit 2 represents the registered entity type,
 *   Digits 3 through 8 represent the registering region code,
 *   Digits 9 through 17 represent the organisation code,
 *   Digit 18 is a check digit (either a number or letter).
 *
 * The registering authority digit most often is a 9, which represents the State
 * Administration for Industry and Commerce (SAIC) as the registering authority.
 *
 * The registered entity type indicates the type of business (or entity). The
 * most common entity types in China are:
 *
 *   Wholly Foreign-Owned Enterprises (WFOE): 外商独资企业
 *   Joint Ventures (JV): 合资
 *   Representative Office: 代表处
 *   State-Owned Enterprise (SOE): 国有企业
 *   Private Enterprise: 民营企业
 *   Individually-Owned: 个体户
 *
 * The registering region code, sometimes referred to as the "administrative
 * division code", is a string of six numbers that indicates where the company
 * is registered. It roughly follows the organisation of the official Chinese
 * regions.
 *
 * The organisation code comes directly from the China Organization Code
 * certificate, an alternative document to the China Business License. It can
 * contain letters or digits.
 *
 * SOURCES
 *    https://zh.wikipedia.org/wiki/统一社会信用代码
 *    https://zh.wikipedia.org/wiki/校验码
 *    https://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/China-TIN.pdf
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings, weightedSum } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const alphabet = '0123456789ABCDEFGHJKLMNPQRTUWXY';

const impl: Validator = {
  name: 'Chinese Unified Social Credit Code',
  localName: '统一社会信用代码',
  abbreviation: 'USCC',
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
    if (value.length !== 18) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    const [front, back, check] = strings.splitAt(value, 8, 17);
    if (!strings.isdigits(front)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    if (back.split('').some(v => !alphabet.includes(v))) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const digit = weightedSum(value.substr(0, 17), {
      weights: [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28],
      modulus: 31,
      alphabet,
    });

    if (alphabet[31 - digit] !== check) {
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

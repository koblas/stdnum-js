/**
 * RRN (South Korean resident registration number).
 *
 * The RRN (resident registration number, 주민등록번호) is a 13-digit number
 * issued to all residents of the Republic of Korea. Foreigners residing in the
 * Republic of Korea receive an alien registration number (ARN) which follows
 * the same encoding pattern.
 *
 * The first six digits code the date of birth. The seventh digit encodes the
 * century and gender. The next four digits encode the place of birth for
 * Koreans or the issuing agency for foreigners, followed by two digits for the
 * community center number, one serial number and a check digit.
 *
 * Source:
 *   http://www.law.go.kr/lsSc.do?tabMenuId=tab18&p1=&subMenu=1&nwYn=1&section=&tabNo=&query=개인정보+보호법
 *   https://en.wikipedia.org/wiki/Resident_registration_number
 *   https://techscience.org/a/2015092901/
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { isValidDateCompactYYYYMMDD, strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { weightedSum } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -/');
}

const centuryPrefix: Record<string, number> = {
  0: 18,
  1: 19,
  2: 19,
  3: 20,
  4: 20,
  5: 19,
  6: 19,
  7: 20,
  8: 20,
  9: 18,
};

const impl: Validator = {
  name: 'South Korean Resident Registration Number',
  localName: '주민등록번호',
  abbreviation: 'RRN',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 6).join('-');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 13) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [dob, century, place, , check] = strings.splitAt(value, 6, 7, 9, 12);

    if (!isValidDateCompactYYYYMMDD(`${centuryPrefix[century]}${dob}`)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (parseInt(place, 10) > 96) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const sum = weightedSum(value.substr(0, 12), {
      modulus: 11,
      weights: [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5],
    });
    if (String((11 - sum) % 10) !== check) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
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

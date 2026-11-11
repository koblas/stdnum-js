/**
 * RRN (South Korean resident registration number).
 *
 * The RRN (resident registration number, 주민등록번호) is a 13-digit number
 * issued to all residents of the Republic of Korea. Foreigners residing in the
 * Republic of Korea receive an alien registration number (ARN) which has the
 * same layout, but no published check digit (see below).
 *
 * The first six digits code the date of birth. The seventh digit encodes the
 * century and gender. The next four digits encode the place of birth for
 * Koreans or the issuing agency for foreigners, followed by two digits for the
 * community center number, one serial number and a check digit.
 *
 * Since October 2020 the six digits after the century/gender digit of a newly
 * issued (or changed) number are random, so they carry no place of birth and
 * no computable check digit. The issue date can't be read from the number, so
 * for anyone born in 2020 or later only the length, digits and birth date are
 * checked. Replacement numbers issued since 2020 to people born earlier will
 * still fail the check digit.
 *
 * Birth dates in the future are rejected; python-stdnum only checks that the
 * date exists. See https://github.com/koblas/stdnum-js/issues/91.
 *
 * For an alien registration number (century/gender digit 5 to 8) only the
 * length, digits and birth date are checked. The Enforcement Decree of the
 * Immigration Act (Article 40-3) defines it as 13 digits showing the date of
 * birth, sex and registering office, and leaves the rest of the scheme to the
 * Minister of Justice, who hasn't published it. The check digit formula
 * isn't public: python-stdnum applies the RRN formula, other validators add
 * 2 to it, and neither cites a source. This differs from python-stdnum, see
 * https://github.com/koblas/stdnum-js/issues/91.
 *
 * Source:
 *   http://www.law.go.kr/lsSc.do?tabMenuId=tab18&p1=&subMenu=1&nwYn=1&section=&tabNo=&query=개인정보+보호법
 *   https://en.wikipedia.org/wiki/Resident_registration_number
 *   https://techscience.org/a/2015092901/
 *   https://www.fnnews.com/news/202006291754239525
 *   https://www.law.go.kr/LSW//lumLsLinkPop.do?lspttninfSeq=82633&chrClsCd=010202
 *   https://overseas.mofa.go.kr/hn-ko/brd/m_6364/view.do?seq=918639
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

// Century/gender digits of alien registration numbers
const ARN_CENTURY = new Set(['5', '6', '7', '8']);

const impl: Validator = {
  name: 'South Korean Resident Registration Number',
  localName: '주민등록번호',
  abbreviation: 'RRN',
  examples: ['9710139019902'],
  formats: ['nnnnnn-nnnnnnn'],
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

    const birthDate = `${centuryPrefix[century]}${dob}`;
    if (!isValidDateCompactYYYYMMDD(birthDate, true)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    // Numbers issued since October 2020 end in six random digits, and the
    // check digit of alien registration numbers isn't published
    if (
      parseInt(birthDate.slice(0, 4), 10) >= 2020 ||
      ARN_CENTURY.has(century)
    ) {
      return {
        isValid: true,
        compact: value,
        isIndividual: true,
        isCompany: false,
      };
    }

    if (parseInt(place, 10) > 96) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const sum = weightedSum(value.slice(0, 12), {
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

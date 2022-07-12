/**
* The Belgian national number is a unique identifier consisting of 11 digits.
*
* Source
*  https://fr.wikipedia.org/wiki/Numéro_de_registre_national
*
* PERSON
*/

import * as exceptions from '../exceptions';
import { strings, isValidDateCompactYYYYMMDD } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -.');
}

function getApproximatelyNow() {
  const ONE_DAY = 1000 * 60 * 60 * 24;
  return new Date(Date.now() + ONE_DAY);
}

function isInPast(date: string | number): boolean {
  return new Date(`${date}`) <= getApproximatelyNow();
}

function getFullYears(yy: string | number): Array<number> {
  return [parseInt(`19${yy}`, 10), parseInt(`20${yy}`, 10)];
}

function getFirstSix(number: string): string {
  return strings.splitAt(number, 6)[0];
}

function getBaseNumber(number: string): string {
  return strings.splitAt(number, 9)[0];
}

function getChecksum(number: string): number {
  const checksumString = strings.splitAt(number, 9)[1];
  return parseInt(checksumString, 10);
}

function toDateArray(number: string): Array<string> {
  return strings.splitAt(number, 2, 4, 6).slice(0, 3);
}

function getValidPastDates(yymmdd: string): Array<string> {
  const [yy, mm, dd] = toDateArray(yymmdd);
  return getFullYears(yy)
    .filter(yyyy => isValidDateCompactYYYYMMDD(`${yyyy}${mm}${dd}`))
    .map(yyyy => `${yyyy}-${mm}-${dd}`)
    .filter(isInPast);
}

function isUnknownDob(dob: string): boolean {
  const [yy, mm, dd] = toDateArray(dob);
  return strings.isdigits(yy) && mm === '00' && strings.isdigits(dd);
}

function toChecksumBasis(year: number, baseNumber: string): number {
  return parseInt(year < 2000 ? baseNumber : `${2}${baseNumber}`, 10);
}

function isValidDob(dob: string): boolean {
  return Boolean(getValidPastDates(dob).length);
}

function isValidFirstSix(firstSix: string): boolean {
  return isUnknownDob(firstSix) || isValidDob(firstSix);
}

function validStructure(number: string): boolean {
  const firstSix = getFirstSix(number);
  return isValidFirstSix(firstSix);
}

function getChecksumBasesUnknownDob(
  dob: string,
  baseNumber: string,
): Array<number> {
  const [yy] = toDateArray(dob);

  return getFullYears(yy)
    .filter(isInPast)
    .map(year => toChecksumBasis(year, baseNumber));
}

function getChecksumBasesForStandardDob(
  dob: string,
  baseNumber: string,
): Array<number> {
  const validPastDates = getValidPastDates(dob);
  const extractYearFromDate = (date: string): number =>
    parseInt(date.split('-')[0], 10);
  const validPastYears = validPastDates.map(extractYearFromDate);
  return validPastYears.map(year => toChecksumBasis(year, baseNumber));
}

function getChecksumBases(number: string): Array<number> {
  const firstSix = getFirstSix(number);
  const baseNumber = getBaseNumber(number);

  if (isUnknownDob(firstSix))
    return getChecksumBasesUnknownDob(firstSix, baseNumber);

  return getChecksumBasesForStandardDob(firstSix, baseNumber);
}

function validChecksum(number: string): boolean {
  const checksumBases = getChecksumBases(number);
  const checksum = getChecksum(number);
  return checksumBases.some(csb => (csb % 97) + checksum === 97);
}

const impl: Validator = {
  name: 'Belgian National Number',
  localName: 'Numéro National',
  abbreviation: 'NN, NISS',
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
    const number = impl.compact(input);

    if (!strings.isdigits(number) || parseInt(number, 10) <= 0) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    if (number.length !== 11) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    if (!validStructure(number)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    if (!validChecksum(number)) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: number,
      isIndividual: true,
      isCompany: false,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

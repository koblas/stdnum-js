/**
 * NRC (Ordine din Registrul Comerţului, Romanian Trade Register identifier).
 *
 * All businesses in Romania have the to register with the National Trade
 * Register Office to receive a registration number. The number contains
 * information about the type of company, county, a sequence number and
 * registration year. This number can change when registration information
 * changes.
 *
 * On 2024-07-26 a new 14 character format without slashes was introduced:
 * the register letter, the registration year, a 6 digit serial number, the
 * county code (00 for registrations after that date) and a check digit. Both
 * formats are in use.
 *
 * Sources
 *   https://www.onrc.ro/index.php/ro/comunicate-de-presa-2024
 *   https://github.com/arthurdejong/python-stdnum/blob/master/stdnum/ro/onrc.py
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { weightedSum } from '../util/checksum';
import { Validator, ValidateReturn } from '../types';

// old YJJ/XXXX/AAAA format
const oldFormatRe = /^[A-Z]\d+\/\d+\/\d+$/;

function* genit() {
  for (let i = 1; i <= 40; i += 1) {
    yield i;
  }

  yield 51;
  yield 52;
}

const counties = new Set(genit());

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  const [value, err] = strings.cleanUnicode(input, '');

  if (err !== null) {
    return [value, err];
  }

  const better = value
    .trim()
    // Convert delimiters to '/'
    .replace(/[ /\\-]+/g, '/')
    // remove optional slash between first letter and county digits
    .replace(/^([A-Z])\//, '$1')
    // normalize county to 2 digits
    .replace(/^([A-Z])(\d)\//, '$10$2/')
    // clean full dates
    .replace(/\/\d{2}[.]\d{2}[.](\d{4})$/, '/$1');

  return [better, null];
}

function validateOldFormat(value: string): ValidateReturn {
  if (!oldFormatRe.test(value)) {
    return { isValid: false, error: new exceptions.InvalidFormat() };
  }

  const [county, serial, year] = value.substr(1).split('/');

  if (serial.length > 5) {
    return { isValid: false, error: new exceptions.InvalidLength() };
  }
  if (county.length > 2 || !counties.has(parseInt(county, 10))) {
    return { isValid: false, error: new exceptions.InvalidComponent() };
  }
  if (year.length !== 4) {
    return { isValid: false, error: new exceptions.InvalidLength() };
  }
  // old format numbers are not issued after 2024
  const y = parseInt(year, 10);
  if (y < 1990 || y > 2024) {
    return { isValid: false, error: new exceptions.InvalidComponent() };
  }

  return {
    isValid: true,
    compact: value,
    isIndividual: false,
    isCompany: true,
  };
}

function isValidCounty(year: number, county: number): boolean {
  // numbers registered after 2024-07-26 have 00 as county code
  if (year < 2024) {
    return counties.has(county);
  }
  if (year === 2024) {
    return county === 0 || counties.has(county);
  }

  return county === 0;
}

function validateNewFormat(value: string): ValidateReturn {
  // new YAAAAXXXXXXJJC format
  if (!strings.isdigits(value.substr(1))) {
    return { isValid: false, error: new exceptions.InvalidFormat() };
  }
  if (value.length !== 14) {
    return { isValid: false, error: new exceptions.InvalidLength() };
  }

  const [, year, , county, check] = strings.splitAt(value, 1, 5, 11, 13);
  const y = parseInt(year, 10);

  if (y < 1990 || y > new Date().getFullYear()) {
    return { isValid: false, error: new exceptions.InvalidComponent() };
  }
  if (!isValidCounty(y, parseInt(county, 10))) {
    return { isValid: false, error: new exceptions.InvalidComponent() };
  }

  // the letter counts as its character code modulo 10
  const sum = weightedSum(
    String(value.charCodeAt(0) % 10) + value.substr(1, 12),
    { modulus: 10 },
  );

  if (check !== String(sum)) {
    return { isValid: false, error: new exceptions.InvalidChecksum() };
  }

  return {
    isValid: true,
    compact: value,
    isIndividual: false,
    isCompany: true,
  };
}

const impl: Validator = {
  name: 'Romanian Trade Register Identifier',
  localName: 'Ordine din Registrul Comerţului',
  abbreviation: 'NRC',
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

    // J: legal entities, F: sole proprietorships and individual or family
    // businesses, C: cooperative societies
    if (!'JFC'.includes(value[0])) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    return value.includes('/')
      ? validateOldFormat(value)
      : validateNewFormat(value);
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

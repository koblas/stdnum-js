/**
 * Personnummer (Swedish personal identity number).
 *
 * The Swedish Personnummer is assigned at birth to all Swedish nationals and to
 * immigrants for tax and identification purposes. The number consists of 10 or
 * 12 digits and starts with the birth date, followed by a serial and a check
 * digit.
 *
 * The 10 digit form (YYMMDD-NNNN) leaves out the century: the separator is '-'
 * until the year someone turns 100 and '+' from then on (Folkbokföringslagen
 * 1991:481 §18). Because that sign depends on when the number was written down,
 * the 12 digit form (YYYYMMDDNNNN) is recommended for storage. compact()
 * returns the 12 digit form; format() returns the 10 digit form for display.
 * When a 12 digit number is given, its 4 digit year is authoritative and any
 * separator is ignored.
 *
 * Source:
 *    https://en.wikipedia.org/wiki/Personal_identity_number_(Sweden)
 *    Folkbokföringslagen (1991:481) §18
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { isValidDateCompactYYYYMMDD, strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { luhnChecksumValidate } from '../util/checksum';

// Personal identity numbers were introduced in 1947, so no holder can have
// been born before this.
const MIN_BIRTH_YEAR = 1800;

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  const [value, err] = strings.cleanUnicode(input, ' :');

  if (err) {
    return [value, err];
  }

  // A 10 or 12 digit number is written without the separator, so put the
  // default one back. '-' is only replaced by '+' the year someone turns 100,
  // which the bare form cannot express.
  const separated =
    (value.length === 10 || value.length === 12) &&
    !'-+'.includes(value[value.length - 5])
      ? `${value.slice(0, -4)}-${value.slice(-4)}`
      : value;

  const [a, b, c] = strings.splitAt(separated, -5, -4);

  return [`${a.replace(/[-+]/g, '')}${b}${c}`, null];
}

/**
 * Convert a cleaned YYMMDD±NNNN or YYYYMMDD±NNNN value to YYYYMMDDNNNN.
 * Returns null when the value doesn't have that shape.
 */
function toLongForm(value: string): string | null {
  if (value.length !== 11 && value.length !== 13) {
    return null;
  }
  const sign = value[value.length - 5];
  const digits = value.slice(0, -5) + value.slice(-4);
  if (!'-+'.includes(sign) || !strings.isdigits(digits)) {
    return null;
  }
  if (value.length === 13) {
    return digits;
  }

  // 10 digit form: the century is the most recent one that doesn't put the
  // birth year in the future, one further back for '+' (100 or older).
  const year = new Date().getFullYear();
  let century = Math.floor(year / 100);
  if (parseInt(digits.slice(0, 2), 10) > year % 100) {
    century -= 1;
  }
  if (sign === '+') {
    century -= 1;
  }

  return `${century}${digits}`;
}

function formatImpl(input: string): string {
  const [value] = clean(input);
  const long = toLongForm(value);

  if (long === null) {
    return value;
  }

  // '+' from the calendar year someone turns 100
  const age = new Date().getFullYear() - parseInt(long.slice(0, 4), 10);
  const sep = age >= 100 ? '+' : '-';

  return `${long.slice(2, 8)}${sep}${long.slice(8)}`;
}

const impl: Validator = {
  name: 'Swedish Personal Identity Number',
  localName: 'Personnummer',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return toLongForm(value) ?? value;
  },

  format: formatImpl,

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 11 && value.length !== 13) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    const long = toLongForm(value);
    if (long === null) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    if (parseInt(long.slice(0, 4), 10) < MIN_BIRTH_YEAR) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    // Adjust for coordination numbers ("Samordningsnummer"), which add 60 to
    // the day of birth
    // https://skatteverket.se/servicelankar/otherlanguages/inenglishengelska/individualsandemployees/coordinationnumbers
    let yyyymmdd = long.slice(0, 8);
    const day = parseInt(yyyymmdd.slice(6, 8), 10);
    if (day > 60) {
      yyyymmdd = yyyymmdd.slice(0, 6) + String(day - 60).padStart(2, '0');
    }

    if (!isValidDateCompactYYYYMMDD(yyyymmdd, true)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    if (!luhnChecksumValidate(long.slice(2))) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: long,
      isIndividual: true,
      isCompany: false,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

/**
 * The National Insurance Number (NINO) is a nine character identifier used in
 * the United Kingdom.
 *
 * The first two characters are all valid except for a few rules described in the source document,
 * the next six characters are numbers issued sequentially, and the final character is
 * a letter A-D. The suffix may be omitted if it is not known.
 *
 * Source
 *  https://www.gov.uk/hmrc-internal-manuals/national-insurance-manual/nim39110
 *  https://en.wikipedia.org/wiki/National_Insurance_number
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -.');
}

function validLength(value: string): boolean {
  // The suffix letter may be omitted, so we permit a length of 8.
  return [8, 9].includes(value.length);
}

function isValidPrefix(prefix: string): boolean {
  const invalidChars = ["D", "F", "I", "Q", "U", "V"];
  const invalidSecondChar = "O";
  const invalidPrefixes = ["BG", "GB", "KN", "NK", "NT", "TN", "ZZ"];

  if (invalidChars.includes(prefix[0]) || invalidChars.includes(prefix[1])) {
    return false;
  }

  if (prefix[1] === invalidSecondChar) {
    return false;
  }

  return !invalidPrefixes.includes(prefix);
}

const VALID_FORMAT_REGEX = /^([A-Z]{2})\d{6}[A-D]?$/;

function validFormat(value: string): boolean {
  const matchData = value.toUpperCase().match(VALID_FORMAT_REGEX);
  const prefix = value.slice(0, 2).toUpperCase();
  return !!matchData && isValidPrefix(prefix);
}

const impl: Validator = {
  name: 'United Kingdom National Insurance Number',
  localName: 'National Insurance Number',
  abbreviation: 'NINO',

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
    if (!validLength(value)) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!validFormat(value)) {
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

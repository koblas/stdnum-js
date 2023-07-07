/**
 * Tax Registration Number (الرقم الضريبي, Egypt tax number).
 *
 * This number consists of 9 digits, usually separated into three groups
 * using hyphens to make it easier to read, like XXX-XXX-XXX.
 *
 * Source
 *   https://emsp.mts.gov.eg:8181/EMDB-web/faces/authoritiesandcompanies/authority/website/SearchAuthority.xhtml?lang=en
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

const ARABIC_NUMBERS_MAP: Record<string, string> = {
  // Arabic-indic digits.
  '٠': '0',
  '١': '1',
  '٢': '2',
  '٣': '3',
  '٤': '4',
  '٥': '5',
  '٦': '6',
  '٧': '7',
  '٨': '8',
  '٩': '9',
  // Extended arabic-indic digits.
  '۰': '0',
  '۱': '1',
  '۲': '2',
  '۳': '3',
  '۴': '4',
  '۵': '5',
  '۶': '6',
  '۷': '7',
  '۸': '8',
  '۹': '9',
};

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  // Normalize the arabic characters to ascii digits
  const norm = input
    .split('')
    .map(c => ARABIC_NUMBERS_MAP[c] ?? c)
    .join('');
  return strings.cleanUnicode(norm, ' -/');
}

const impl: Validator = {
  name: 'Tax Registration Number',
  localName: 'الرقم الضريبي',
  abbreviation: 'TN',

  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 3, 6).join('-');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 9) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: false,
      isCompany: false,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

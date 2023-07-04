/**
 * UEN (Singapore's Unique Entity Number).
 *
 * The Unique Entity Number (UEN) is a 9 or 10 digit identification issued by
 * the government of Singapore to businesses that operate within Singapore.
 * Accounting and Corporate Regulatory Authority (ACRA)
 *
 * There are three different formats:
 * * Business (ROB): It consists of 8 digits followed by a check letter.
 * * Local Company (ROC): It consists of 9 digits (the 4 leftmost digits
 *   represent the year of issuance) followed by a check letter.
 * * Others: Consists of 10 characters, begins with either the R letter, or the
 *   S letter or the T letter followed by 2 digits representing the last two
 *   digits of the issuance year, followed by two letters representing the
 *   entity type, 4 digits and finally a check letter.
 *
 * Source
 *   https://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/Singapore-TIN.pdf
 *   https://www.uen.gov.sg/ueninternet/faces/pages/admin/aboutUEN.jspx
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { weightedSum } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' ');
}

const OTHER_UEN_ENTITY_TYPES = [
  'CC',
  'CD',
  'CH',
  'CL',
  'CM',
  'CP',
  'CS',
  'CX',
  'DP',
  'FB',
  'FC',
  'FM',
  'FN',
  'GA',
  'GB',
  'GS',
  'HS',
  'LL',
  'LP',
  'MB',
  'MC',
  'MD',
  'MH',
  'MM',
  'MQ',
  'NB',
  'NR',
  'PA',
  'PB',
  'PF',
  'RF',
  'RP',
  'SM',
  'SS',
  'TC',
  'TU',
  'VH',
  'XL',
];

function validateLocal(value: string): ValidateReturn {
  const [front, check] = strings.splitAt(value, -1);
  if (!strings.isdigits(front)) {
    return { isValid: false, error: new exceptions.InvalidComponent() };
  }

  const sum = weightedSum(front, {
    modulus: 11,
    weights: [10, 8, 6, 4, 9, 7, 5, 3, 1],
  });

  const digit = 'ZKCMDNERGWH'[sum];

  if (check !== digit) {
    return { isValid: false, error: new exceptions.InvalidChecksum() };
  }

  return {
    isValid: true,
    compact: value,
    isIndividual: false,
    isCompany: true,
  };
}

function validateBusiness(value: string): ValidateReturn {
  const [front, check] = strings.splitAt(value, -1);
  if (!strings.isdigits(front)) {
    return { isValid: false, error: new exceptions.InvalidComponent() };
  }

  const sum = weightedSum(front, {
    modulus: 11,
    weights: [10, 4, 9, 3, 8, 2, 7, 1],
  });

  const digit = 'XMKECAWLJDB'[sum];

  if (check !== digit) {
    return { isValid: false, error: new exceptions.InvalidChecksum() };
  }

  return {
    isValid: true,
    compact: value,
    isIndividual: false,
    isCompany: true,
  };
}

function validateOther(value: string): ValidateReturn {
  const [kind, year, etype, rest, check] = strings.splitAt(value, 1, 3, 5, -1);
  if (!['R', 'S', 'T'].includes(kind)) {
    return { isValid: false, error: new exceptions.InvalidComponent() };
  }
  if (!strings.isdigits(year)) {
    return { isValid: false, error: new exceptions.InvalidComponent() };
  }

  if (kind === 'T' && parseInt(year, 10) > new Date().getFullYear() % 100) {
    return { isValid: false, error: new exceptions.InvalidComponent() };
  }
  if (!OTHER_UEN_ENTITY_TYPES.includes(etype)) {
    return { isValid: false, error: new exceptions.InvalidComponent() };
  }
  if (!strings.isdigits(rest)) {
    return { isValid: false, error: new exceptions.InvalidComponent() };
  }
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWX0123456789';

  const digit =
    alphabet[
      (weightedSum(value.substr(0, 9), {
        weights: [4, 3, 5, 3, 10, 2, 2, 5, 7],
        modulus: 11,
        alphabet,
      }) +
        6) %
        11
    ];

  if (check !== digit) {
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
  name: 'Singapore Unique Entity Number',
  localName: 'Unique Entity Number',
  abbreviation: 'UEN',
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
    if (value.length !== 9 && value.length !== 10) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    if (value.length === 9) {
      return validateBusiness(value);
    }
    if (strings.isdigits(value[0])) {
      return validateLocal(value);
    }

    return validateOther(value);
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

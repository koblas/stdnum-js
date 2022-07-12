/**
 * New Zealand Bank account number
 *
 * In the real bank account format for country - New Zealand is in this format.
 * As per the standards bank account number should be as the format
 * BB-RRRR-AAAAAAA-SSS (B- Bank, R-Branch, A-Account,S-Suffix).
 * BBRRRR is captured as the National bank Code and it is expected to enter a
 * 10 digit account number, like so: AAAAAAASSS.
 *
 * Source
 *   http://www.paymentsnz.co.nz/clearing-systems/bulk-electronic-clearing-system
 *   https://www.ird.govt.nz/resources/d/8/d8e49dce-1bda-4875-8acf-9ebf908c6e17/rwt-nrwt-spec-2014.pdf
 *
 * BANK
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { weightedSum } from '../util/checksum';

// Data from pages 10 and 11 of
// https://www.ird.govt.nz/resources/d/8/d8e49dce-1bda-4875-8acf-9ebf908c6e17/rwt-nrwt-spec-2014.pdf
const bankData: Record<
  string,
  {
    algorithm: string;
    branches: [number, number][];
  }
> = {
  '01': {
    algorithm: 'AB',
    branches: [
      [1, 999],
      [1100, 1199],
      [1800, 1899],
    ],
  },
  '02': {
    algorithm: 'AB',
    branches: [
      [1, 999],
      [1200, 1299],
    ],
  },
  '03': {
    algorithm: 'AB',
    branches: [
      [1, 999],
      [1300, 1399],
      [1500, 1599],
      [1700, 1799],
      [1900, 1999],
    ],
  },
  '06': {
    algorithm: 'AB',
    branches: [
      [1, 999],
      [1400, 1499],
    ],
  },
  '08': { algorithm: 'D', branches: [[6500, 6599]] },
  '09': { algorithm: 'E', branches: [[0, 0]] },
  '11': {
    algorithm: 'AB',
    branches: [
      [5000, 6499],
      [6600, 8999],
    ],
  },
  '12': {
    algorithm: 'AB',
    branches: [
      [3000, 3299],
      [3400, 3499],
      [3600, 3699],
    ],
  },
  '13': { algorithm: 'AB', branches: [[4900, 4999]] },
  '14': { algorithm: 'AB', branches: [[4700, 4799]] },
  '15': { algorithm: 'AB', branches: [[3900, 3999]] },
  '16': { algorithm: 'AB', branches: [[4400, 4499]] },
  '17': { algorithm: 'AB', branches: [[3300, 3399]] },
  '18': { algorithm: 'AB', branches: [[3500, 3599]] },
  '19': { algorithm: 'AB', branches: [[4600, 4649]] },
  '20': { algorithm: 'AB', branches: [[4100, 4199]] },
  '21': { algorithm: 'AB', branches: [[4800, 4899]] },
  '22': { algorithm: 'AB', branches: [[4000, 4049]] },
  '23': { algorithm: 'AB', branches: [[3700, 3799]] },
  '24': { algorithm: 'AB', branches: [[4300, 4349]] },
  '25': { algorithm: 'F', branches: [[2500, 2599]] },
  '26': { algorithm: 'G', branches: [[2600, 2699]] },
  '27': { algorithm: 'AB', branches: [[3800, 3849]] },
  '28': { algorithm: 'G', branches: [[2100, 2149]] },
  '29': { algorithm: 'G', branches: [[2150, 2299]] },
  '30': { algorithm: 'AB', branches: [[2900, 2949]] },
  '31': { algorithm: 'X', branches: [[2800, 2849]] },
  '33': { algorithm: 'F', branches: [[6700, 6799]] },
  '35': { algorithm: 'AB', branches: [[2400, 2499]] },
  '38': { algorithm: 'AB', branches: [[9000, 9499]] },
};

const algorithms: Record<string, { weights: number[]; modulus: number }> = {
  A: {
    weights: [0, 0, 6, 3, 7, 9, 0, 0, 10, 5, 8, 4, 2, 1, 0, 0, 0, 0],
    modulus: 11,
  },
  B: {
    weights: [0, 0, 0, 0, 0, 0, 0, 0, 10, 5, 8, 4, 2, 1, 0, 0, 0, 0],
    modulus: 11,
  },
  C: {
    weights: [3, 7, 0, 0, 0, 0, 9, 1, 10, 5, 3, 4, 2, 1, 0, 0, 0, 0],
    modulus: 11,
  },
  D: {
    weights: [0, 0, 0, 0, 0, 0, 0, 7, 6, 5, 4, 3, 2, 1, 0, 0, 0, 0],
    modulus: 11,
  },
  E: {
    weights: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 4, 3, 2, 0, 0, 0, 1],
    modulus: 11,
  },
  F: {
    weights: [0, 0, 0, 0, 0, 0, 0, 1, 7, 3, 1, 7, 3, 1, 0, 0, 0, 0],
    modulus: 10,
  },
  G: {
    weights: [0, 0, 0, 0, 0, 0, 0, 1, 3, 7, 1, 3, 7, 1, 0, 3, 7, 1],
    modulus: 10,
  },
  X: {
    weights: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    modulus: 1,
  },
};

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  // We're going to allow '-' or ' ' separators
  const [valueA, err] = strings.cleanUnicode(input, '');

  if (err !== null) {
    return [valueA, err];
  }
  const cvalue = valueA.trim();

  // No separtor, keep it simple
  if (!/[ -]/.test(cvalue)) {
    return [cvalue, null];
  }

  const parts = cvalue.split(/[ -]/g);
  if (parts.length !== 4) {
    return [cvalue, new exceptions.InvalidFormat()];
  }

  return [
    [
      parts[0].padStart(2, '0'),
      parts[1].padStart(4, '0'),
      parts[2].padStart(7, '0'),
      parts[3].padStart(3, '0'),
    ].join(''),
    null,
  ];
}

const impl: Validator = {
  name: 'New Zealand Bank Account Number',
  localName: 'Bank Account Number',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 2, 6, -3).join('-');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 16) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [bank, branch, account, suffix] = strings.splitAt(value, 2, 6, -3);

    const bankInfo = bankData[bank];
    if (!bankInfo) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    const bnum = parseInt(branch, 10);
    if (!bankInfo.branches.some(pair => bnum >= pair[0] && bnum <= pair[1])) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    let alg = bankInfo.algorithm;
    if (alg === 'AB') {
      alg = parseInt(account, 10) < 990000 ? 'A' : 'B';
    }

    const algInfo = algorithms[alg];
    if (!algInfo) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const sum = weightedSum(`${bank}${branch}0${account}0${suffix}`, algInfo);

    if (String(sum) !== '0') {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
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

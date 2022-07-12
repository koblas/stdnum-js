/**
 * VAT (Идентификационен номер по ДДС, Bulgarian VAT number).
 *
 * The Bulgarian VAT (Данък върху добавената стойност) number is either 9
 * (for legal entities) or 10 digits (for physical persons, foreigners and
 * others) long. Each type of number has its own check digit algorithm.
 *
 * PERSON/ENTITY
 */

import * as exceptions from '../exceptions';
import * as egn from './egn';
import * as pnf from './pnf';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { weightedSum } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  const [value, err] = strings.cleanUnicode(input, ' -/');

  if (err !== null) {
    return [value, err];
  }
  if (value.startsWith('BG')) {
    return [value.substr(2), null];
  }
  return [value, err];
}

function checkLegal(value: string): boolean {
  const [front, check] = strings.splitAt(value, -1);

  let sum = weightedSum(front, {
    modulus: 11,
    weights: [1, 2, 3, 4, 5, 6, 7, 8],
  });

  if (sum === 10) {
    sum = weightedSum(front, {
      modulus: 11,
      weights: [3, 4, 5, 6, 7, 8, 9, 10],
    });
  }

  return String(sum % 10) === check;
}

function checkOther(value: string): boolean {
  const [front, check] = strings.splitAt(value, -1);

  const sum =
    11 -
    weightedSum(front, {
      modulus: 11,
      weights: [4, 3, 2, 7, 6, 5, 4, 3, 2],
    });

  return String(sum % 10) !== check;
}

const impl: Validator = {
  name: 'Bulgarian VAT Number',
  localName: 'Идентификационен номер по ДДС',
  abbreviation: 'ДДС номер',
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
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    if (!['0', '1', '2', '3', '9'].includes(value[0])) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    if (value.length === 9) {
      if (!checkLegal(value)) {
        return { isValid: false, error: new exceptions.InvalidChecksum() };
      }
    } else if (
      !egn.validate(value).isValid &&
      !pnf.validate(value).isValid &&
      !checkOther(value)
    ) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: value.length === 10,
      isCompany: value.length === 9,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

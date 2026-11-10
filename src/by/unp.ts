/**
 * УНП, UNP (Учетный номер плательщика, the Belarus VAT number).
 *
 * The УНП (UNP) or Учетный номер плательщика (Uchetniy nomer platel'shika,
 * Payer account number) is issued to organisations and individuals for tax
 * purposes. The number consists of 9 digits (numeric for organisations,
 * alphanumeric for individuals) and contains a region identifier, a serial per
 * region and a check digit.
 *
 * Source
 *   https://be.wikipedia.org/wiki/Уліковы_нумар_плацельшчыка
 *   http://pravo.levonevsky.org/bazaby09/sbor37/text37892/index3.htm
 *
 * PERSON/ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { weightedSum } from '../util/checksum';

const PREFIX = ['УНП', 'УНП', 'UNP', 'UNP'];
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  const [value, err] = strings.cleanUnicode(input, ' -/');

  if (err !== null) {
    return [value, err];
  }

  const v2 = PREFIX.reduce(
    (acc: string | null, p) =>
      acc || (!value.startsWith(p) ? acc : value.slice(p.length)),
    null,
  );

  // Cyrillic letters that look like the Latin letters used in the number
  const latin = (v2 ?? value).replace(
    /[АВЕКМНОРСТ]/g,
    c => 'ABEKMHOPCT'['АВЕКМНОРСТ'.indexOf(c)],
  );

  return [latin, null];
}

const impl: Validator = {
  name: 'Belarus VAT Number',
  localName: 'Учетный номер плательщика',
  abbreviation: 'УНП (UNP)',
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
    if (value.length !== 9) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value.slice(2))) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    // The first 2 characters are either both digits or both letters
    const head = value.slice(0, 2);
    if (
      !strings.isdigits(head) &&
      !head.split('').every(c => 'ABCEHKMOPT'.includes(c))
    ) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    if (!'1234567ABCEHKM'.includes(value[0])) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const [front, check] = strings.splitAt(value, -1);

    let frontClean = front;
    if (!strings.isdigits(front.slice(0, 2))) {
      const vv = String('ABCEHKMOPT'.indexOf(front[1]));
      frontClean = `${front[0]}${vv}${front.slice(2)}`;
    }

    const sum = weightedSum(frontClean, {
      modulus: 11,
      weights: [29, 23, 19, 17, 13, 7, 5, 3],
      alphabet,
    });

    if (sum === 10 || String(sum) !== check) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: true,
      isCompany: true,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

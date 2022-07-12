/**
 * MST (Mã số thuế, Vietnam tax number).
 *
 * This number consists of 10 digits. Branches have a 13 digit number,
 * where the first ten digits are the same as the parent company's.
 *
 * The first two digits is the province code where the business was
 * established. If an enterprise relocates its head office from one
 * province to another, ths MST will remain unchanged.
 *
 * The following seven digits are a sequential number from 0000001 to
 * 9999999.
 *
 * The tenth digit is the check digit for the first nine digits, which is
 * used to verify the number was correctly typed.
 *
 * The last optional three digits are a sequence from 001 to 999
 * indicating branches of the enterprise. These digits are usually
 * separated from the first ten digits using a dash (-)
 *
 * Source
 *   https://vi.wikipedia.org/wiki/Thuế_Việt_Nam#Mã_số_thuế_(MST)_của_doanh_nghiệp
 *   https://easyinvoice.vn/ma-so-thue/
 *   https://ub.com.vn/threads/huong-dan-tra-cuu-ma-so-thue-doanh-nghiep-moi-nhat.261393/
 *
 * /ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { weightedSum } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -.');
}

const impl: Validator = {
  name: 'Vietnamese Tax Number',
  localName: 'Mã số thuế',
  abbreviation: 'MST',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 10).join('-');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 10 && value.length !== 13) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    const [province, sequence, check, suffix] = strings.splitAt(
      value,
      2,
      9,
      10,
    );

    if (sequence === '0000000' || suffix === '000' || province === '00') {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const sum = weightedSum(value.substr(0, 9), {
      modulus: 11,
      weights: [31, 29, 23, 19, 17, 13, 7, 5, 3],
    });

    if (check !== String(10 - sum)) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: false,
      isCompany: true,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

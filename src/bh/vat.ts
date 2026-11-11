/**
 * VAT account number (Bahrain VAT account number).
 *
 * Bahrain has no general taxpayer identification number; the VAT account
 * number issued by the National Bureau for Revenue (NBR) on the VAT
 * registration certificate is the tax number in use. It has 15 digits and
 * starts with 2. VAT group account numbers start with 21.
 *
 * The NBR doesn't publish a check digit. Every published individual account
 * number starting with 20 that we could find (16, from registration
 * certificates published by banks, telecoms and other companies) has a valid
 * Luhn check digit in position 10, so that is checked for numbers starting
 * with 20. Group numbers (21) and the 22 series don't follow it consistently,
 * so for those only the length and prefix are checked.
 *
 * Sources
 *   https://www.nbr.gov.bh/vat_faqs/2
 *   https://www.itbstevetowers.com/wp-content/uploads/2025/07/VAT-GENERAL-GUIDE.pdf
 *   https://www.kreston.com/wp-content/uploads/2023/11/Bahrain_General_VAT_Guide.pdf
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { luhnChecksumValidate } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./');
}

const impl: Validator = {
  name: 'Bahrain VAT Account Number',
  localName: 'رقم حساب ضريبة القيمة المضافة',
  abbreviation: 'VAT',
  examples: ['200000425500002'],
  formats: ['nnnnnnnnnnnnnnn'],

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
    if (value.length !== 15) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    if (value[0] !== '2') {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (value[1] === '0' && !luhnChecksumValidate(value.substring(0, 10))) {
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

export const {
  name,
  localName,
  abbreviation,
  examples,
  formats,
  validate,
  format,
  compact,
} = impl;

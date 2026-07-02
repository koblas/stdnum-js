/**
 * TIN (Taxpayer Identification Number).
 *
 * Source
 *   https://frcs.org.fj/wp-content/uploads/2025/05/Brochure-Taxpayer-Identification-Number-TIN-April-2025.pdf
 *   https://frcs.org.fj/our-services/taxation-section/individuals/registrations/
 *   https://taxdo.com/resources/global-tax-id-validation-guide/fiji
 *   https://tin-check.com/en/fiji/
 *
 * PERSON / ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^\d{9,10}$/;

const impl: Validator = {
  name: 'Taxpayer Identification Number',
  localName: 'Taxpayer Identification Number',
  abbreviation: 'TIN',

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

    if (value.length < 9 || value.length > 10) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    const match = value.match(idRegexp);
    if (!match) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
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

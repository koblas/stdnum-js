/**
 * TIN (Fiji Tax Identification Number).
 *
 * The Fiji TIN is issued by the Fiji Revenue and Customs Service (FRCS) to
 * individuals and non-individuals. It has 9 or 10 digits:
 *
 * - Legacy TINs have 9 digits. The first two digits give the registration
 *   type: 01-26 individual, 30 partnership, 40 shipping and insurance,
 *   50 company, 60 non-profit organisation, 70 estate, 75 trust,
 *   80 co-operative and 90 government.
 * - TINs issued through the online portal (TPOS) have 10 digits and start
 *   with 29, whatever the registration type.
 *
 * Existing 9 digit TINs remain in use. No check digit algorithm is published.
 *
 * Source
 *   https://frcs.org.fj/our-services/taxation-section/individuals/registrations/
 *   https://www.frcs.org.fj/wp-content/uploads/2019/11/Tax-Talk-ammended.pdf
 *
 * PERSON/ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./');
}

// Registration type codes of 9 digit TINs (01-26 are individuals)
const ENTITY_TYPES = ['30', '40', '50', '60', '70', '75', '80', '90'];

function isIndividualType(code: string): boolean {
  const n = parseInt(code, 10);

  return n >= 1 && n <= 26;
}

const impl: Validator = {
  name: 'Fiji Tax Identification Number',
  localName: 'Tax Identification Number',
  abbreviation: 'TIN',
  examples: ['501234567', '2912345678'],
  formats: ['nnnnnnnnn', 'nnnnnnnnnn'],

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

    const code = value.substring(0, 2);

    if (value.length === 10) {
      if (code !== '29') {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }

      return {
        isValid: true,
        compact: value,
        isIndividual: true,
        isCompany: true,
      };
    }

    if (!isIndividualType(code) && !ENTITY_TYPES.includes(code)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: isIndividualType(code),
      isCompany: !isIndividualType(code),
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

/**
 * BC PHN (British Columbia Personal Health Number).
 *
 * A unique, numerical, lifetime identifier used in the specific identification
 * of an individual client or patient who has had any interaction with the
 * British Columbia health system. It is assigned only to and used by one person
 * and will not be assigned to any other person.
 * The existence of a PHN does not imply eligibility for health care services in
 * BC or provide any indication of an individual’s benefit status.
 *
 * The PNH is a 10-digit number where the first digit is always 9, and the last
 * digit is a MOD-11 check digit.
 *
 * Source:
 *   https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp/bc-residents/personal-health-identification
 *   https://www2.gov.bc.ca/assets/gov/health/practitioner-pro/software-development-guidelines/conformance-standards/vol-4b-app-rules-client-registry.pdf
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings, weightedSum } from '../util';
import { Validator, ValidateReturn } from '../types';
import { isdigits, splitAt } from '../util/strings';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const impl: Validator = {
  name: 'British Columbia Personal Health Number',
  localName: 'British Columbia Personal Health Number',
  abbreviation: 'BC_BHN',

  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return splitAt(value, 4, 7).join(' ');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 10) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (value[0] !== '9') {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (!isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [, front, check] = strings.splitAt(value, 1, -1);

    const sum = weightedSum(front, {
      weights: [2, 4, 8, 5, 10, 9, 7, 3],
      modulus: 11,
    });

    if (String((11 - sum) % 11) !== check) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
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

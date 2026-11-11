/**
 * NID (Personal Number).
 *
 * Source
 *   https://en.wikipedia.org/wiki/National_identification_number
 *   https://www.oecd.org/content/dam/oecd/en/topics/policy-issue-focus/aeoi/georgia-tin.pdf
 *   https://lookuptax.com/docs/tax-identification-number/georgia-tax-id-guide
 *   https://taxdo.com/resources/global-tax-id-validation-guide/georgia
 *   https://www.ecoi.net/en/document/1207477.html
 *   https://georgiaexpats.com/guides/georgian-personal-number/
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^\d{11}$/;

const impl: Validator = {
  name: 'Personal Number',
  localName: 'პირადი ნომერი',
  abbreviation: 'NID',
  examples: ['01234567890'],
  formats: ['nnnnnnnnnnn'],

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

    if (value.length !== 11) {
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
      isCompany: false,
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

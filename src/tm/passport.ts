/**
 * Turkmen Passport Number (Türkmen pasporty).
 *
 * Format: 2 letters followed by 7 digits (9 chars). Turkmenistan biometric/ICAO MRPs (issued since 2008). Composition not authoritatively documented; a search summary cited a related 'personal number' as 2 letters + 8 digits, which differs from the passport serial.
 *
 * Source
 *   https://en.wikipedia.org/wiki/Turkmen_passport
 *   https://www.gov.uk/government/publications/turkmenistan-knowledge-base-profile/turkmenistan-knowledge-base-profile
 *   https://india.tmembassy.gov.tm/consular-services/biometrik-maglumatly-pasport
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp = /^[A-Z]{2}\d{7}$/;

const impl: Validator = {
  name: 'Turkmen Passport Number',
  localName: 'Türkmen pasporty',
  abbreviation: 'PASSPORT',

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

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

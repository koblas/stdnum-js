/**
 * Passport (German passport number).
 *
 * Format: Reisepass: 9 characters starting with C, F, G, H, J or K, followed by letters or digits
 * (optionally with the MRZ check digit and a trailing letter). Provisional passport (vorläufiger Reisepass):
 * 8 characters, A or B followed by seven digits.
 *
 * Source
 *   https://www.marktflecken-Villmar.de/fileadmin/villmar/downloads/ausweisrecht/Seriennummer-des-Personalausweises.pdf
 *   https://learn.microsoft.com/en-us/microsoft-365/compliance/sit-defn-germany-passport-number?view=o365-worldwide
 *   https://en.wikipedia.org/wiki/German_passport
 *   https://www.bmi.bund.de/SharedDocs/downloads/DE/veroeffentlichungen/themen/moderne-verwaltung/ausweise/personalausweis-seriennummer.pdf?__blob=publicationFile&v=15
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings, weightedSum } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const idRegexp =
  /^(?:([CFGHJK][0-9CFGHJKLMNPRTVWXYZ]{8})([0-9]?)[A-Z]?|[AB]\d{7})$/;

const impl: Validator = {
  name: 'German Passport Number',
  localName: 'Ausweisen',
  abbreviation: 'Passport',
  examples: ['C01X00T47', 'C01X00T478', 'CZ6311T472D'],
  formats: ['acccccccc', 'accccccccc', 'accccccccna', 'annnnnnn'],

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

    if (value.length < 8 || value.length > 11) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    const match = value.match(idRegexp);
    if (!match) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    // Checksum is optional -- present in the matchine readable form, not in the human
    if (match[2]) {
      const [issue, issueCheck] = [match[1], match[2]];

      const issueSum = weightedSum(issue, {
        weights: [7, 3, 1],
        modulus: 10,
      });

      if (String(issueSum) !== issueCheck) {
        return {
          isValid: false,
          error: new exceptions.InvalidChecksum('issue.checksum'),
        };
      }
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

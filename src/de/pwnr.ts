/**
 * PwNr (Personalausweisnummer, German personal identity card number).
 *
 * The identity card of the Federal Republic of Germany is an official document as proof of
 * identity for German nationals. In principle, the identity card authority responsible for
 * the main residence assigns it at the request of the citizen.
 *
 * Source
 *   https://de.wikipedia.org/wiki/Personalausweis_(Deutschland)
 *   http://www.pruefziffernberechnung.de/P/Personalausweis-DE.shtml
 *   https://learn.microsoft.com/en-us/microsoft-365/compliance/sit-defn-germany-identity-card-number?view=o365-worldwide
 *   http://www.pruefziffernberechnung.de/Begleitdokumente/BKZ.shtml
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings, isValidDateCompactYYMMDD, weightedSum } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  const [value, err] = strings.cleanUnicode(input, ' -./,');

  if (err) {
    return [value, err];
  }

  // Old format IDs had the national code at position 11 new format has them at 24
  if (/[A-Z]/.test(value[10])) {
    const [p1, p2, p3, p4] = strings.splitAt(value, 10, 11, 25);

    return [p1 + p3 + p2 + p4, err];
  }

  return [value, err];
}

const impl: Validator = {
  name: 'German Personalausweisnummer',
  localName: 'Personalausweisnummer',
  abbreviation: 'PwNr',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 10, 17, 24, 25).join(' ');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 26) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!/^[CFGHJKLMNPRTVWXYZ][0-9CFGHJKLMNPRTVWXYZ]+[0-9]$/) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [
      issue,
      issueCheck,
      birth,
      birthCheck,
      expiry,
      expiryCheck,
      nationality,
      checksum,
    ] = strings.splitAt(value, 9, 10, 16, 17, 23, 24, 25);

    console.log('GOT', value, issue, birth, expiry);

    if (!isValidDateCompactYYMMDD(birth)) {
      return {
        isValid: false,
        error: new exceptions.InvalidComponent('birthdate'),
      };
    }
    if (!isValidDateCompactYYMMDD(expiry)) {
      return {
        isValid: false,
        error: new exceptions.InvalidComponent('expiry'),
      };
    }
    if (!/^[A-Z]$/.test(nationality)) {
      return {
        isValid: false,
        error: new exceptions.InvalidComponent('nationality'),
      };
    }

    const issueSum = weightedSum(issue, {
      weights: [7, 3, 1],
      modulus: 10,
    });
    const birthSum = weightedSum(birth, {
      weights: [7, 3, 1],
      modulus: 10,
    });
    const expirySum = weightedSum(expiry, {
      weights: [7, 3, 1],
      modulus: 10,
    });
    console.log('ISSUE', issue, issueSum, issueCheck);
    if (String(issueSum) !== issueCheck) {
      return {
        isValid: false,
        error: new exceptions.InvalidChecksum('issue.checksum'),
      };
    }
    if (String(birthSum) !== birthCheck) {
      return {
        isValid: false,
        error: new exceptions.InvalidChecksum('birth.checksum'),
      };
    }

    if (String(expirySum) !== expiryCheck) {
      return {
        isValid: false,
        error: new exceptions.InvalidChecksum('expiry.checksum'),
      };
    }

    const sum = weightedSum(value.substring(0, 24), {
      weights: [7, 3, 1],
      modulus: 10,
    });
    if (String(sum) !== checksum) {
      return {
        isValid: false,
        error: new exceptions.InvalidChecksum('checksum'),
      };
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

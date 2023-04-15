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

const oldRegex = /^([0-9CFGHJKLMNPRTVWXYZ]{9})([0-9])[A-Z]?$/;

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  const [value, err] = strings.cleanUnicode(input, ' -./,');

  if (err) {
    return [value, err];
  }

  // Old format IDs had the national code at position 11 new format has them at 24
  if (value.length >= 25 && /[A-Z]/.test(value[10])) {
    const [p1, p2, p3, p4] = strings.splitAt(value, 10, 11, 25);

    return [p1 + p3 + p2 + p4, err];
  }

  return [value, err];
}

export function validateIssue(value: string): ValidateReturn {
  const match = value.match(oldRegex);
  if (!match) {
    return { isValid: false, error: new exceptions.InvalidFormat() };
  }

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

  return {
    isValid: true,
    compact: value,
    isIndividual: true,
    isCompany: false,
  };
}

export function validateNew(value: string): ValidateReturn {
  if (
    !/^[0-9CFGHJKLMNPRTVWXYZ][0-9CFGHJKLMNPRTVWXYZ]+[A-Z][0-9]$/.test(value)
  ) {
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

  // The hope is that the issue information grows better
  // checks over time and should be a shared function
  const res = validateIssue(issue + issueCheck);
  if (res.isValid === false) {
    return res;
  }

  const birthSum = weightedSum(birth, {
    weights: [7, 3, 1],
    modulus: 10,
  });
  const expirySum = weightedSum(expiry, {
    weights: [7, 3, 1],
    modulus: 10,
  });
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
    if (value.length === 26) {
      return validateNew(value);
    } else if (value.length === 10 || value.length === 11) {
      return validateIssue(value);
    } else {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

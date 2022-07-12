/**
 * IdNr (Steuerliche Identifikationsnummer, German personal tax number).
 *
 * The IdNr (or Steuer-IdNr) is a personal identification number that is
 * assigned to individuals in Germany for tax purposes and is meant to replace
 * the Steuernummer. The number consists of 11 digits and does not embed any
 * personal information.
 *
 * Source
 *   https://de.wikipedia.org/wiki/Steuerliche_Identifikationsnummer
 *   http://www.identifikationsmerkmal.de/
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { iso7064mod10x11validate } from '../util/iso7064';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const impl: Validator = {
  name: 'German Personal Tax Number',
  localName: 'Steuerliche Identifikationsnummer',
  abbreviation: 'IdNr',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 2, 5, 8).join(' ');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 11) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    if (value[0] === '0') {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    // In the first 10 digits exactly one digit must be repeated two or
    // three times and other digits can appear only once.
    const counter: Record<number, number> = {};

    value
      .substr(0, 10)
      .split('')
      .map(v => parseInt(v, 10))
      .forEach(v => {
        counter[v] = (counter[v] ?? 0) + 1;
      });
    const more = Object.values(counter).filter(v => v > 1);
    if (more.length !== 1 && [2, 3].includes(more[0])) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    if (!iso7064mod10x11validate(value)) {
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

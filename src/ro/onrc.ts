/**
 * NRC (Ordine din Registrul Comerţului, Romanian Trade Register identifier).
 *
 * All businesses in Romania have the to register with the National Trade
 * Register Office to receive a registration number. The number contains
 * information about the type of company, county, a sequence number and
 * registration year. This number can change when registration information
 * changes.
 *
 * Source
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

const checkRe = /[A-Z]\d+\/\d{1,5}\/\d+/;

function* genit() {
  for (let i = 0; i <= 41; i += 1) {
    yield i;
  }

  yield 51;
  yield 52;
}

const counties = new Set(genit());

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  const [value, err] = strings.cleanUnicode(input, '');

  if (err !== null) {
    return [value, err];
  }

  const better = value
    // Convert delimiters to '/'
    .replace(/[ /\\-]+/g, '/')
    // remove optional slash between first letter and county digits
    .replace(/^([A-Z])\//, '$1')
    // normalize country to 2 digits
    .replace(/([A-Z])(\d)\//, '$10$2')
    // clean full dates
    .replace(/\/\d{2}[.]\d{2}[.](\d{4})$/, '/$1');

  return [better, null];
}

const impl: Validator = {
  name: 'Romanian Trade Register Identifier',
  localName: 'Ordine din Registrul Comerţului',
  abbreviation: 'NRC',
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

    if (!checkRe.test(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    if (!'JFC'.includes(value[0])) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const [county, serial, year] = value.substr(1).split('/');

    if (!counties.has(parseInt(county, 10))) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (serial.length > 5) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (year.length !== 4) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: false,
      isCompany: true,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

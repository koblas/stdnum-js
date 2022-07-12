/**
 * AIC (Italian code for identification of drugs).
 *
 * AIC codes are used to identify drugs allowed to be sold in Italy. Codes are
 * issued by the Italian Drugs Agency (AIFA, Agenzia Italiana del Farmaco), the
 * government authority responsible for drugs regulation in Italy.
 * The number consists of 9 digits and includes a check digit.
 *
 * More information:
 *   https://www.gazzettaufficiale.it/do/atto/serie_generale/caricaPdf?cdimg=14A0566800100010110001&dgu=2014-07-18&art.dataPubblicazioneGazzetta=2014-07-18&art.codiceRedazionale=14A05668&art.num=1&art.tiposerie=SG
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' ');
}

const alphabet = '0123456789BCDFGHJKLMNPQRSTUVWXYZ';

const impl: Validator = {
  name: 'Italian Code for Identification of Drugs',
  localName: 'Autorizzazione all’Immissione in Commercio',
  abbreviation: 'AIC',
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
    if (value.length !== 6 && value.length !== 9) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    let base10 = value;
    if (value.length === 6) {
      // Base32 version
      const chars = value.split('');
      if (!chars.every(v => alphabet.includes(v))) {
        return { isValid: false, error: new exceptions.InvalidFormat() };
      }
      base10 = String(
        chars
          .reverse()
          .reduce((acc, v, idx) => acc + alphabet.indexOf(v) * 32 ** idx, 0),
      ).padStart(9, '0');
    }

    // Base10 version
    if (!strings.isdigits(base10)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [front, end] = strings.splitAt(base10, -1);

    const sum = front
      .split('')
      .map(v => parseInt(v, 10))
      .reduce((acc, v, idx) => {
        const vv = v * ((idx % 2) + 1);

        return acc + Math.floor(vv / 10) + (vv % 10);
      }, 0);

    if (String(sum % 10) !== end) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: false,
      isCompany: false,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

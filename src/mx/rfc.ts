/**
 * RFC (Registro Federal de Contribuyentes, Mexican tax number).
 *
 * This number is used to identify individuals and companies for tax purposes.
 *
 * The company number is 12 digits where the first 3 letters or digits are
 * derived from the name of the company, the following 6 contain the date of
 * incorporation, followed by 3 check digits.
 *
 * Personal numbers consist of 13 digits where the first 4 characters from the
 * person's name, followed by their birth date and 3 check digits.
 *
 * The first two check digits are calculated based on the person's or company's
 * full name. The last check digit is calculated over all the preceding digits
 * in the number. However, it seems a lot of numbers (estimated at around 1.5%
 * of all numbers) are in use with invalid check digits so this test is disabled
 * by default.
 *
 * More information:
 *
 * https://www.infomex.org.mx/jspsi/documentos/2005/seguimiento/06101/0610100162005_065.doc
 * https://es.wikipedia.org/wiki/Registro_Federal_de_Contribuyentes_(M%C3%A9xico)
 *
 * An online validation service is available at:
 *
 * https://portalsat.plataforma.sat.gob.mx/ConsultaRFC/
 *
 * VAT  PERSON/ENTITY
 */

import * as exceptions from '../exceptions';
import { isValidDateCompactYYMMDD, strings, weightedSum } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, '-_ ');
}

const nameBlacklist = new Set([
  'BUEI',
  'BUEY',
  'CACA',
  'CACO',
  'CAGA',
  'CAGO',
  'CAKA',
  'CAKO',
  'COGE',
  'COJA',
  'COJE',
  'COJI',
  'COJO',
  'CULO',
  'FETO',
  'GUEY',
  'JOTO',
  'KACA',
  'KACO',
  'KAGA',
  'KAGO',
  'KAKA',
  'KOGE',
  'KOJO',
  'KULO',
  'MAME',
  'MAMO',
  'MEAR',
  'MEAS',
  'MEON',
  'MION',
  'MOCO',
  'MULA',
  'PEDA',
  'PEDO',
  'PENE',
  'PUTA',
  'PUTO',
  'QULO',
  'RATA',
  'RUIN',
]);

const checkAlphabet = '0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ';
// const checkAlphabetDict: Record<string, number> = checkAlphabet
//   .split('')
//   .reduce((acc, c, idx) => ({ ...acc, [c]: idx }), {});

const impl: Validator = {
  name: 'Mexican Tax Number',
  localName: 'Registro Federal de Contribuyentes',
  abbreviation: 'RFC',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value.toLocaleUpperCase();
  },

  format(input: string): string {
    const [value] = clean(input);

    if (value.length === 12) {
      return strings.splitAt(value, 3, 9).join(' ');
    }
    if (value.length === 13) {
      return strings.splitAt(value, 4, 10).join(' ');
    }
    return strings.splitAt(value, 4).join(' ');
  },

  /**
   * Check if the number is a valid RFC number.
   * This checks the length, formatting and other contraints. It does not check
   * for control letter.
   */
  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length === 10 || value.length === 13) {
      if (!/^[A-Z&Ñ]{4}[0-9]{6}([0-9A-Z]{3})?$/.test(value)) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
      if (nameBlacklist.has(value.substr(0, 4))) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
      if (!isValidDateCompactYYMMDD(value.substr(4, 6))) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
    } else if (value.length === 12) {
      if (!/^[A-Z&Ñ]{3}[0-9]{6}[0-9A-Z]{3}$/.test(value)) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
      if (!isValidDateCompactYYMMDD(value.substr(3, 6))) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }
    } else {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    if (value.length >= 12) {
      if (!/[1-9A-V][1-9A-Z][0-9A]$/.test(value)) {
        return { isValid: false, error: new exceptions.InvalidComponent() };
      }

      const [front, check] = strings.splitAt(value, -1);

      const sum = weightedSum(front.padStart(12, ' '), {
        modulus: 11,
        alphabet: checkAlphabet,
        weights: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        reverse: true,
      });

      // const sum = value
      //   .substr(0, value.length - 1)
      //   .padStart(12, ' ')
      //   .split('')
      //   .reduce(
      //     (acc, c, idx) => acc + (checkAlphabetDict[c] ?? 0) * (13 - idx),
      //     0,
      //   );
      const mod = 11 - (sum % 11);
      let val;
      if (mod === 11) {
        val = '0';
      } else if (mod === 10) {
        val = 'A';
      } else {
        val = String(mod);
      }

      if (check !== val) {
        return { isValid: false, error: new exceptions.InvalidChecksum() };
      }
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: value.length !== 12,
      isCompany: value.length === 12,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

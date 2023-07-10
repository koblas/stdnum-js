/**
 * GSTIN (Goods and Services Tax identification number, Indian VAT number).
 *
 * The Goods and Services Tax identification number (GSTIN) is a 15 digit unique
 * identifier assigned to all business entities in India registered under the
 * Goods and Services Tax (GST) Act, 2017.
 *
 * Each GSTIN begins with a 2 digit state code, the next 10 characters are the
 * holder's PAN, the 13th character is an alphanumeric digit that represents the
 * number of GSTIN registrations made in a state or union territory for same the
 * PAN, the 14th character is 'Z' and the last character is an alphanumeric
 * check digit calculated using Luhn mod 36 algorithm.
 *
 * DESCRIPTION
 *
 * Source
 *   https://bajajfinserv.in/insights/what-is-goods-and-service-tax-identification-number
 *   https://ddvat.gov.in/docs/List%20of%20State%20Code.pdf
 *   https://en.wikipedia.org/wiki/Goods_and_Services_Tax_(India)
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { validate as panValidate } from './pan';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const validRe = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9A-Z]{3}$/;

const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const STATE_CODES: Record<string, string> = {
  '01': 'Jammu and Kashmir',
  '02': 'Himachal Pradesh',
  '03': 'Punjab',
  '04': 'Chandigarh',
  '05': 'Uttarakhand',
  '06': 'Haryana',
  '07': 'Delhi',
  '08': 'Rajasthan',
  '09': 'Uttar Pradesh',
  '10': 'Bihar',
  '11': 'Sikkim',
  '12': 'Arunachal Pradesh',
  '13': 'Nagaland',
  '14': 'Manipur',
  '15': 'Mizoram',
  '16': 'Tripura',
  '17': 'Meghalaya',
  '18': 'Assam',
  '19': 'West Bengal',
  '20': 'Jharkhand',
  '21': 'Orissa',
  '22': 'Chattisgarh',
  '23': 'Madhya Pradesh',
  '24': 'Gujarat',
  '25': 'Daman and Diu',
  '26': 'Dadar and Nagar Haveli',
  '27': 'Maharashtra',
  '28': 'Andhra Pradesh',
  '29': 'Karnataka',
  '30': 'Goa',
  '31': 'Lakshadweep',
  '32': 'Kerala',
  '33': 'Tamil Nadu',
  '34': 'Puducherry',
  '35': 'Anadaman and Nicobar Islands',
  '36': 'Telangana',
  '37': 'Andhra Pradesh (New)',
};

const VALID_STATE_CODES = Object.keys(STATE_CODES);

const impl: Validator = {
  name: 'NAME',
  localName: 'NAME',
  abbreviation: 'GSTIN',

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
    if (value.length !== 15) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    if (!validRe.test(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const [state, panValue] = strings.splitAt(value, 2, 12);
    if (!VALID_STATE_CODES.includes(state)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (value[12] === '0' || value[13] !== 'Z') {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (!panValidate(panValue).isValid) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const [first, check] = strings.splitAt(value, -1);

    const sum = first
      .split('')
      .map((char, index) => {
        const product = ALPHABET.indexOf(char) * (index % 2 !== 0 ? 2 : 1);

        return (
          Math.floor(product / ALPHABET.length) + (product % ALPHABET.length)
        );
      })
      .reduce((prev, current) => {
        return prev + current;
      });

    const checksum =
      (ALPHABET.length - (sum % ALPHABET.length)) % ALPHABET.length;
    if (ALPHABET[checksum] !== check) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
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

/**
 * The National Identity Card (abbreviation: NIC) is the identity document in use in Sri Lanka.
 * It is compulsory for all Sri Lankan citizens who are fifteen years of age and older to have their NICs.
 * NICs are issued by the Department for Registration of Persons. 
 * The Registration of Persons Act No.32 of 1968 as amended by Act Nos 28 and 37 of 1971 and Act No.11 of 1981 legislates the issuance and usage of NICs.
 *
 * 
 * source:
 * https://en.wikipedia.org/wiki/National_identity_card_(Sri_Lanka)
 */


import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const impl: Validator = {
  name: 'Sri Lankan National Identity Card Number',
  localName: 'NIC Number',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);
    // NIC has better readability without any additional formattings
    return value.toLowerCase();
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }

    if(value.length!==10 && value.length!==12 ){
      return { isValid: false, error: new exceptions.InvalidLength() };
    }

    // Check if NIC matches the specified patterns (check for both old format & new format )
    if (!/^[\d]{9}[vVxX]$|^[\d]{12}$/.test(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat('Invalid NIC format') };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: true,
      isCompany: false,
    };
  },
};

export const { name, localName, validate, format, compact } = impl;
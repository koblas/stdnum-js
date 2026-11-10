/**
 * NPWP (Nomor Pokok Wajib Pajak, Indonesian VAT Number).
 *
 * The Nomor Pokok Wajib Pajak (NPWP) is assigned to organisations and
 * individuals (families) by the Indonesian Tax Office after registration by the
 * tax payers.
 *
 * The number consists of 15 digits of which the first 2 denote the type of
 * entity, 6 digits to identify the tax payer, a check digit over the first 8
 * digits followed by 3 digits to identify the local tax office and 3 digits for
 * branch code.
 *
 * The first 2 digits are not checked against a list of known entity types:
 * the published lists are incomplete, and real numbers use prefixes (such as
 * 03, 66, 75 and 90) that they leave out.
 *
 * Source
 *   https://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/Indonesia-TIN.pdf
 *   https://metacpan.org/pod/Business::ID::NPWP
 *   https://wiki.scn.sap.com/wiki/display/CRM/Indonesia
 *
 * PERSON/ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';
import { luhnChecksumValidate } from '../util/checksum';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -.');
}

const impl: Validator = {
  name: 'Indonesian VAT Number',
  localName: 'Nomor Pokok Wajib Pajak',
  abbreviation: 'NPWP',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    const [a, b, c, d, e, f] = strings.splitAt(value, 2, 5, 8, 9, 12);

    return `${a}.${b}.${c}.${d}-${e}.${f}`;
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 15) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    if (!luhnChecksumValidate(value.slice(0, 9))) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: true,
      isCompany: true,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

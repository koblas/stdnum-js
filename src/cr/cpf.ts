/**
 * CPF (Cédula de Persona Física, Costa Rica physical person ID number).
 *
 * The Cédula de Persona Física (CPF), also known as Cédula de Identidad is an
 * identifier of physical persons.
 *
 * The number consists of 10 digits in the form 0P-TTTT-AAAA where P represents
 * the province, TTTT represents the volume (tomo) padded with zeroes on the
 * left, and AAAA represents the entry (asiento) also padded with zeroes on the
 * left.
 *
 * It seems to be usual for the leading zeroes in each of the three parts to be
 * omitted.
 *
 * Source
 *    https://www.hacienda.go.cr/consultapagos/ayuda_cedulas.htm
 *    https://www.procomer.com/downloads/quiero/guia_solicitud_vuce.pdf (page 11)
 *    https://www.hacienda.go.cr/ATV/frmConsultaSituTributaria.aspx
 *
 * PERSON
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  const [value, err] = strings.cleanUnicode(input, ' ');
  if (err) {
    return [value, err];
  }
  const parts = value.split('-');
  if (parts.length === 3) {
    parts[0] = parts[0].padStart(2, '0');
    parts[1] = parts[1].padStart(4, '0');
    parts[2] = parts[2].padStart(4, '0');
  }
  const number = parts.join('');

  if (number.length !== 10 && number.length !== 9) {
    return ['', new exceptions.InvalidLength()];
  }

  return [number.padStart(10, '0'), err];
}

const impl: Validator = {
  name: 'Costa Rica Physical Person ID Number',
  localName: 'Cédula de Persona Física',
  abbreviation: 'CPF',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 2, 6).join('-');
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 10) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }
    if (value[0] !== '0') {
      return { isValid: false, error: new exceptions.InvalidComponent() };
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

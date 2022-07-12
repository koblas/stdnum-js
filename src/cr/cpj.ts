/**
 * CPJ (Cédula de Persona Jurídica, Costa Rica tax number).
 *
 * The Cédula de Persona Jurídica (CPJ) is an identifier of legal entities for
 * tax purposes.
 *
 * This number consists of 10 digits, the first indicates the class of juridical
 * person, followed by a 3 digit sequence number identifying the type of
 * juridical person, followed by 6 digits sequence number assigned by Registro
 * Nacional de la República de Costa Rica.
 *
 * Source
 *   https://www.hacienda.go.cr/consultapagos/ayuda_cedulas.htm
 *   https://www.procomer.com/downloads/quiero/guia_solicitud_vuce.pdf (page 11)
 *   http://www.registronacional.go.cr/personas_juridicas/documentos/Consultas/Listado%20de%20Clases%20y%20Tipos%20Cedulas%20Juridicas.pdf
 *   https://www.hacienda.go.cr/ATV/frmConsultaSituTributaria.aspx
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

const classTypes: Record<string, string[]> = {
  '2': ['100', '200', '300', '400'],
  '3': [
    '002',
    '003',
    '004',
    '005',
    '006',
    '007',
    '008',
    '009',
    '010',
    '011',
    '012',
    '013',
    '014',
    '101',
    '102',
    '103',
    '104',
    '105',
    '106',
    '107',
    '108',
    '109',
    '110',
  ],
  '4': ['000'],
  '5': ['001'],
};

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -');
}

const impl: Validator = {
  name: 'Costa Rica Tax Number',
  localName: 'Cédula de Persona Jurídica',
  abbreviation: 'CPJ',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    return strings.splitAt(value, 1, 4).join('-');
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

    const items = classTypes[value[0]];
    if (!items) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }
    if (!items.includes(value.substr(1, 3))) {
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

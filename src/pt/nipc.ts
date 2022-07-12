/**
 * NIPC (Número de Identificação de Pessoa Coletiva, Portuguese VAT number).
 *
 * The NIF (Número de identificação fiscal, NIPC, Número de Identificação de
 * Pessoa Colectiva) is used for VAT purposes. It is a 9-digit number with a
 * simple checksum. The first digit depends on what the number refers to,
 * e.g.: 1-3 are regular people, 5 are companies.
 *
 * Source
 * https://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/Portugal-TIN.pdf
 *
 * PERSON/ENTITY
 */

import * as nif from './nif';

import { Validator } from '../types';

const impl: Validator = {
  ...nif,
  name: 'Portuguese Legal Person Identification Number',
  localName: 'Número de Identificação de Pessoa Colectiva',
  abbreviation: 'NIPC',
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

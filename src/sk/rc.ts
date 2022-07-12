import { Validator } from '../types';
import * as rc from '../cz/rc';

const impl: Validator = {
  ...rc,
  name: 'Slovak Birth Number',
  localName: 'Rodné číslo',
  abbreviation: 'RC',
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

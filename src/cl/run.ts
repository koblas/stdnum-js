import * as rut from './rut';

import { Validator } from '../types';

const impl: Validator = {
  ...rut,
  name: 'Chilean National Identification Number',
  localName: 'Rol Único Nacional ',
  abbreviation: 'RUN',
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

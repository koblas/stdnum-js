import { Validator } from '../types/types';
import * as nipt from './nipt';

export type AL = {
  nipt: Validator;
};

const al: AL = {
  nipt,
};

export default al;

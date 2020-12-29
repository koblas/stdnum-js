import { Validator } from './types';
import * as ad from './ad';
import * as al from './al';
import * as ar from './ar';
import * as at from './at';
import * as au from './au';
import * as br from './br';
import * as bz from './bz';
import * as ca from './ca';
import * as cl from './cl';
import * as cn from './cn';
import * as co from './co';
import * as cr from './cr';
import * as doV from './do';
import * as ec from './ec';
import * as es from './es';
import * as gt from './gt';
import * as id from './id';
import * as kr from './kr';
import * as mx from './mx';
import * as my from './my';
import * as nz from './nz';
import * as pe from './pe';
import * as py from './py';
import * as ru from './ru';
import * as sv from './sv';
import * as us from './us';
import * as uy from './uy';
import * as ve from './ve';
import * as za from './za';

export { Validator } from './types';

export const stdnum = {
  ad,
  al,
  ar,
  at,
  au,
  br,
  bz,
  ca,
  cl,
  cn,
  co,
  cr,
  do: doV,
  ec,
  es,
  gt,
  id,
  kr,
  mx,
  my,
  nz,
  pe,
  py,
  ru,
  sv,
  us,
  uy,
  ve,
  za,
};

const personValidators: Record<string, Validator[]> = {
  cn: [cn.ric],
  id: [id.npwp],
  kr: [kr.rrn],
  mx: [mx.curp],
  my: [my.nric],
  nz: [nz.ird],
  us: [us.ssn],
  za: [za.tin, za.idnr],
};

const entityValidators: Record<string, Validator[]> = {
  au: [au.abn, au.acn, au.tfn],
  cn: [cn.uscc],
  id: [id.npwp],
  kr: [kr.brn],
  nz: [nz.ird],
  us: [us.ein],
  za: [za.tin],
};

/**
 *  Apply the necessary validators for a given country to validate an ID number
 */
export function validatePerson(
  country: string,
  value: string,
): { isValid?: boolean; checked: boolean } {
  const vset = personValidators[country.toLocaleLowerCase()];

  if (!vset || vset.length === 0) {
    return { checked: false };
  }

  const match = vset.some(grp => grp.validate(value).isValid);

  return { checked: true, isValid: match };
}

/**
 *  Apply the necessary validators for a given country to validate an Entity (Business) ID number
 */
export function validateEntity(
  country: string,
  value: string,
): { isValid?: boolean; checked: boolean } {
  const vset = entityValidators[country.toLocaleLowerCase()];

  if (!vset || vset.length === 0) {
    return { checked: false };
  }

  const match = vset.some(grp => grp.validate(value).isValid);

  return { checked: true, isValid: match };
}

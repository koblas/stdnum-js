import { Validator } from './types';
import * as AD from './ad';
import * as AL from './al';
import * as AR from './ar';
import * as AT from './at';
import * as AU from './au';
import * as BA from './ba';
import * as BE from './be';
import * as BG from './bg';
import * as BR from './br';
import * as BZ from './bz';
import * as CA from './ca';
import * as CL from './cl';
import * as CN from './cn';
import * as CO from './co';
import * as CR from './cr';
import * as DO from './do';
import * as EC from './ec';
import * as ES from './es';
import * as GT from './gt';
import * as HK from './hk';
import * as ID from './id';
import * as IL from './il';
import * as IN from './in';
import * as JP from './jp';
import * as KR from './kr';
import * as MX from './mx';
import * as MY from './my';
import * as NZ from './nz';
import * as PE from './pe';
import * as PY from './py';
import * as RU from './ru';
import * as SG from './sg';
import * as SV from './sv';
import * as TH from './th';
import * as TW from './tw';
import * as US from './us';
import * as UY from './uy';
import * as VE from './ve';
import * as VN from './vn';
import * as ZA from './za';

export { Validator } from './types';

// Live an uppercase world, to prevent keyword collisions
export const stdnum = {
  AD,
  AL,
  AR,
  AT,
  AU,
  BA,
  BE,
  BG,
  BR,
  BZ,
  CA,
  CL,
  CN,
  CO,
  CR,
  DO,
  EC,
  ES,
  GT,
  HK,
  ID,
  IL,
  IN,
  JP,
  KR,
  MX,
  MY,
  NZ,
  PE,
  PY,
  RU,
  SG,
  SV,
  TH,
  TW,
  US,
  UY,
  VE,
  VN,
  ZA,
};

const personValidators: Record<string, Validator[]> = {
  BA: [BA.jmbg],
  BG: [BG.vat],
  CN: [CN.ric],
  HK: [HK.hkid],
  ID: [ID.npwp],
  IL: [IL.idnr],
  IN: [IN.pan],
  KR: [KR.rrn],
  MX: [MX.curp],
  MY: [MY.nric],
  NZ: [NZ.ird],
  TH: [TH.idnr],
  US: [US.ssn],
  UY: [UY.nie, UY.cedula],
  ZA: [ZA.tin, ZA.idnr],
};

const entityValidators: Record<string, Validator[]> = {
  AU: [AU.abn, AU.acn, AU.tfn],
  BE: [BE.vat],
  BG: [BG.vat],
  CN: [CN.uscc],
  ID: [ID.npwp],
  IL: [IL.hp],
  IN: [IN.aadhaar],
  JP: [JP.cn],
  KR: [KR.brn],
  NZ: [NZ.ird],
  SG: [SG.uen],
  TW: [TW.ubn],
  US: [US.ein],
  UY: [UY.rut],
  VN: [VN.mst],
  ZA: [ZA.tin],
};

const euVat: Record<string, Validator[]> = {
  AD: [AD.nrt],
  BE: [BE.vat],
  BG: [BG.vat],
};

/**
 *  Apply the necessary validators for a given country to validate an ID number
 */
export function validatePerson(
  country: string,
  value: string,
): { isValid?: boolean; checked: boolean } {
  const vset = personValidators[country.toLocaleUpperCase()];

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
  const vset = entityValidators[country.toLocaleUpperCase()];

  if (!vset || vset.length === 0) {
    return { checked: false };
  }

  const match = vset.some(grp => grp.validate(value).isValid);

  return { checked: true, isValid: match };
}

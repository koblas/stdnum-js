import { Validator } from './types';
import * as AD from './ad';
import * as AL from './al';
import * as AR from './ar';
import * as AT from './at';
import * as AU from './au';
import * as AZ from './az';
import * as BA from './ba';
import * as BE from './be';
import * as BG from './bg';
import * as BR from './br';
import * as BY from './by';
import * as BZ from './bz';
import * as CA from './ca';
import * as CH from './ch';
import * as CL from './cl';
import * as CN from './cn';
import * as CO from './co';
import * as CR from './cr';
import * as CU from './cu';
import * as CY from './cy';
import * as CZ from './cz';
import * as DE from './de';
import * as DK from './dk';
import * as DO from './do';
import * as EC from './ec';
import * as EE from './ee';
import * as ES from './es';
import * as FI from './fi';
import * as FR from './fr';
import * as GB from './gb';
import * as GR from './gr';
import * as GT from './gt';
import * as HK from './hk';
import * as HR from './hr';
import * as HU from './hu';
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
  BY,
  BZ,
  CA,
  CH,
  CL,
  CN,
  CO,
  CR,
  CU,
  CY,
  CZ,
  DE,
  DO,
  EC,
  EE,
  ES,
  FI,
  FR,
  GB,
  GR,
  GT,
  HK,
  HR,
  HU,
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
  AZ: [AZ.tin, AZ.pin],
  BA: [BA.jmbg],
  BG: [BG.vat],
  BY: [BY.unp],
  CN: [CN.ric],
  CH: [CH.ssn],
  CU: [CU.ni],
  CZ: [CZ.rc],
  DE: [DE.idnr],
  EE: [EE.ik],
  ES: [ES.dni, ES.nie],
  FI: [FI.hetu],
  FR: [FR.nir, FR.nif],
  GB: [GB.utr],
  GR: [GR.amka],
  HK: [HK.hkid],
  HR: [HR.oib],
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
  BY: [BY.unp],
  CN: [CN.uscc],
  CH: [CH.uid, CH.vat],
  CY: [CH.vat],
  CZ: [CZ.dic],
  DE: [DE.vat, DE.stnr],
  DK: [DK.cvr],
  EE: [EE.kmkr, EE.registrikood],
  ES: [ES.cif, ES.nif],
  FI: [FI.alv, FI.ytunnus],
  FR: [FR.siren, FR.siret, FR.tva],
  GB: [GB.vat],
  GR: [GR.vat],
  HR: [HU.anum],
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

export const euVat: Record<string, Validator[]> = {
  AD: [AD.nrt],
  BE: [BE.vat],
  BG: [BG.vat],
  CH: [CH.vat],
  CY: [CY.vat],
  DE: [DE.vat],
  DK: [DK.cvr],
  ES: [ES.nif],
  FR: [FR.tva],
  // GB: [GB.vat],
  GR: [GR.vat],
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

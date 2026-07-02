import * as AD from './ad';
import * as AF from './af';
import * as AG from './ag';
import * as AI from './ai';
import * as AL from './al';
import * as AM from './am';
import * as AO from './ao';
import * as AR from './ar';
import * as AT from './at';
import * as AU from './au';
import * as AZ from './az';
import * as BA from './ba';
import * as BB from './bb';
import * as BD from './bd';
import * as BE from './be';
import * as BG from './bg';
import * as BO from './bo';
import * as BR from './br';
import * as BS from './bs';
import * as BY from './by';
import * as BZ from './bz';
import * as CA from './ca';
import * as CH from './ch';
import * as CI from './ci';
import * as CL from './cl';
import * as CM from './cm';
import * as CN from './cn';
import * as CO from './co';
import * as CR from './cr';
import * as CU from './cu';
import * as CY from './cy';
import * as CZ from './cz';
import * as DE from './de';
import * as DK from './dk';
import * as DM from './dm';
import * as DO from './do';
import * as DZ from './dz';
import * as EC from './ec';
import * as EE from './ee';
import * as EG from './eg';
import * as ES from './es';
import * as ET from './et';
import * as FI from './fi';
import * as FJ from './fj';
import * as FO from './fo';
import * as FR from './fr';
import * as GB from './gb';
import * as GD from './gd';
import * as GE from './ge';
import * as GH from './gh';
import * as GR from './gr';
import * as GN from './gn';
import * as GT from './gt';
import * as GY from './gy';
import * as HK from './hk';
import * as HR from './hr';
import * as HT from './ht';
import * as HU from './hu';
import * as ID from './id';
import * as IE from './ie';
import * as IL from './il';
import * as IN from './in';
import * as IS from './is';
import * as IT from './it';
import * as JM from './jm';
import * as JP from './jp';
import * as KE from './ke';
import * as KH from './kh';
import * as KN from './kn';
import * as KR from './kr';
import * as KZ from './kz';
import * as LA from './la';
import * as LB from './lb';
import * as LC from './lc';
import * as LI from './li';
import * as LK from './lk';
import * as LT from './lt';
import * as LU from './lu';
import * as LV from './lv';
import * as MA from './ma';
import * as MC from './mc';
import * as MD from './md';
import * as ME from './me';
import * as MK from './mk';
import * as MN from './mn';
import * as MT from './mt';
import * as MU from './mu';
import * as MX from './mx';
import * as MY from './my';
import * as MZ from './mz';
import * as NG from './ng';
import * as NL from './nl';
import * as NO from './no';
import * as NP from './np';
import * as NZ from './nz';
import * as OM from './om';
import * as PE from './pe';
import * as PG from './pg';
import * as PH from './ph';
import * as PK from './pk';
import * as PL from './pl';
import * as PT from './pt';
import * as PY from './py';
import * as QA from './qa';
import * as RO from './ro';
import * as RS from './rs';
import * as RU from './ru';
import * as SB from './sb';
import * as SE from './se';
import * as SG from './sg';
import * as SI from './si';
import * as SK from './sk';
import * as SM from './sm';
import * as SN from './sn';
import * as SR from './sr';
import * as SV from './sv';
import * as TH from './th';
import * as TJ from './tj';
import * as TM from './tm';
import * as TN from './tn';
import * as TO from './to';
import * as TR from './tr';
import * as TT from './tt';
import * as TW from './tw';
import * as TZ from './tz';
import * as UA from './ua';
import * as UG from './ug';
import * as US from './us';
import * as UY from './uy';
import * as VC from './vc';
import * as VE from './ve';
import * as VN from './vn';
import * as WS from './ws';
import * as YE from './ye';
import * as ZA from './za';
import * as ZM from './zm';
import * as exceptions from './exceptions';
import type { Validator } from './types';

export type { Validator } from './types';

// Live an uppercase world, to prevent keyword collisions
export const stdnum: Record<string, Record<string, Validator>> = {
  AD,
  AF,
  AG,
  AI,
  AL,
  AM,
  AO,
  AR,
  AT,
  AU,
  AZ,
  BA,
  BB,
  BD,
  BE,
  BG,
  BO,
  BR,
  BS,
  BY,
  BZ,
  CA,
  CH,
  CI,
  CL,
  CM,
  CN,
  CO,
  CR,
  CU,
  CY,
  CZ,
  DE,
  DK,
  DM,
  DO,
  DZ,
  EC,
  EE,
  EG,
  ES,
  ET,
  FI,
  FJ,
  FO,
  FR,
  GB,
  GD,
  GE,
  GH,
  GR,
  GN,
  GT,
  GY,
  HK,
  HR,
  HT,
  HU,
  ID,
  IE,
  IL,
  IN,
  IS,
  IT,
  JM,
  KH,
  KN,
  KZ,
  LA,
  LB,
  LC,
  LI,
  LK,
  LT,
  LU,
  LV,
  JP,
  KE,
  KR,
  MA,
  MC,
  MD,
  ME,
  MK,
  MN,
  MT,
  MU,
  MX,
  MY,
  MZ,
  NG,
  NL,
  NO,
  NP,
  NZ,
  OM,
  PE,
  PG,
  PH,
  PK,
  PL,
  PT,
  PY,
  QA,
  RO,
  RS,
  RU,
  SB,
  SE,
  SG,
  SI,
  SK,
  SM,
  SN,
  SR,
  SV,
  TH,
  TJ,
  TM,
  TN,
  TO,
  TR,
  TT,
  TW,
  TZ,
  UA,
  UG,
  US,
  UY,
  VC,
  VE,
  VN,
  WS,
  YE,
  ZA,
  ZM,
};

export const personValidators: Record<string, Validator[]> = {
  AD: [AD.nrt],
  AI: [AI.tin],
  AL: [AL.nipt],
  AO: [AO.nif, AO.bi],
  AR: [AR.cuit, AR.dni],
  AT: [AT.vnr],
  AU: [AU.tfn],
  AZ: [AZ.pin, AZ.tin],
  BA: [BA.jmbg],
  BD: [BD.nid],
  BE: [BE.bis, BE.insz, BE.nn],
  BG: [BG.egn, BG.pnf, BG.vat],
  BR: [BR.cpf],
  BY: [BY.unp],
  BZ: [BZ.tin],
  CA: [CA.sin],
  CH: [CH.ssn],
  CL: [CL.run], // which is the same as RUT
  CN: [CN.ric],
  CO: [CO.nit],
  CR: [CR.cpf, CR.cr],
  CU: [CU.ni],
  CZ: [CZ.rc],
  DE: [DE.idnr, DE.svnr],
  DK: [DK.cpr],
  DO: [DO.cedula],
  EC: [EC.ci],
  EE: [EE.ik],
  ES: [ES.dni, ES.nie],
  ET: [ET.nid],
  FI: [FI.hetu],
  FJ: [FJ.tin],
  FR: [FR.nif, FR.nir],
  GB: [GB.nino, GB.utr],
  GE: [GE.nid],
  GH: [GH.tin],
  GR: [GR.amka],
  GT: [GT.cui],
  HK: [HK.hkid],
  HR: [HR.oib],
  HU: [HU.anum],
  ID: [ID.npwp],
  IE: [IE.pps],
  IL: [IL.idnr],
  IN: [IN.aadhaar],
  IS: [IS.kennitala],
  IT: [IT.codicefiscale],
  JM: [JM.tin],
  KR: [KR.rrn],
  LI: [LI.peid],
  LT: [LT.asmens],
  LV: [LV.pvn],
  ME: [ME.jmbg],
  MK: [MK.jmbg],
  MU: [MU.nid],
  MX: [MX.curp, MX.rfc],
  MY: [MY.nric],
  MZ: [MZ.bi, MZ.nuit],
  NG: [NG.nid],
  NL: [NL.onderwijsnummer, NL.bsn],
  NO: [NO.fodselsnummer],
  NP: [NP.nid],
  NZ: [NZ.ird],
  PE: [PE.cui, PE.ce],
  PK: [PK.cnic],
  PL: [PL.pesel],
  PT: [PT.nif],
  PY: [PY.ruc, PY.cedula],
  RO: [RO.cnp],
  RS: [RS.jmbg],
  RU: [RU.inn],
  SE: [SE.personnummer],
  SI: [SI.jmbg],
  SK: [SK.rc],
  SV: [SV.nit],
  TH: [TH.idnr],
  TR: [TR.tckimlik],
  TT: [TT.nid],
  TW: [TW.ubn],
  TZ: [TZ.nid],
  UA: [UA.rntrc],
  US: [US.ssn],
  UY: [UY.nie, UY.cedula],
  VN: [VN.mst],
  ZA: [ZA.tin, ZA.idnr],
};

export const entityValidators: Record<string, Validator[]> = {
  AD: [AD.nrt],
  AI: [AI.tin],
  AL: [AL.nipt],
  AO: [AO.nif],
  AR: [AR.cuit],
  AT: [AT.businessid, AT.tin, AT.uid],
  AU: [AU.abn, AU.acn, AU.tfn],
  AZ: [AZ.tin],
  BE: [BE.vat],
  BG: [BG.vat],
  BR: [BR.cnpj],
  BY: [BY.unp],
  BZ: [BZ.tin],
  CA: [CA.bn],
  CH: [CH.uid, CH.vat],
  CL: [CL.rut],
  CN: [CN.uscc],
  CO: [CO.nit],
  CR: [CR.cpj],
  CY: [CY.vat],
  CZ: [CZ.dic],
  DE: [DE.stnr, DE.vat],
  DK: [DK.cvr],
  DO: [DO.ncf, DO.rnc],
  EC: [EC.ruc],
  EE: [EE.kmkr, EE.registrikood],
  ES: [ES.cif],
  FI: [FI.alv, FI.ytunnus],
  FJ: [FJ.tin],
  FR: [FR.siren, FR.siret, FR.tva],
  GB: [GB.vat],
  GR: [GR.vat],
  GT: [GT.nit],
  HU: [HU.anum],
  ID: [ID.npwp],
  IE: [IE.vat],
  IL: [IL.hp],
  IN: [IN.pan],
  IS: [IS.kennitala, IS.vsk],
  IT: [IT.iva],
  JM: [JM.tin],
  JP: [JP.cn],
  KR: [KR.brn],
  LI: [LI.peid],
  LT: [LT.pvm],
  LU: [LU.tva],
  LV: [LV.pvn],
  MC: [MC.tva],
  MD: [MD.idno],
  MA: [MA.ice, MA.ice9],
  MT: [MT.vat],
  MX: [MX.rfc],
  MZ: [MZ.nuit],
  NG: [NG.tin],
  NL: [NL.btw],
  NO: [NO.mva, NO.orgnr],
  NZ: [NZ.ird],
  PE: [PE.ruc],
  PH: [PH.tin],
  PK: [PK.ntn],
  PL: [PL.nip, PL.regon],
  PT: [PT.nipc],
  PY: [PY.ruc],
  RO: [RO.onrc, RO.cui],
  RS: [RS.pib],
  RU: [RU.inn],
  SE: [SE.orgnr, SE.vat],
  SG: [SG.uen],
  SI: [SI.ddv],
  SK: [SK.dph],
  SM: [SM.coe],
  SV: [SV.nit],
  TR: [TR.vkn],
  TT: [TT.nid],
  TW: [TW.ubn],
  UA: [UA.edrpou],
  US: [US.ein],
  UY: [UY.rut],
  VN: [VN.mst],
  ZA: [ZA.tin, ZA.vat],
};

/**
 * https://en.wikipedia.org/wiki/VAT_identification_number
 */
export const euVat: Record<string, Validator[]> = {
  AD: [AD.nrt],
  AT: [AT.uid],
  BE: [BE.vat],
  BG: [BG.vat],
  CH: [CH.vat],
  HR: [HR.oib],
  CY: [CY.vat],
  DE: [DE.vat],
  CZ: [CZ.dic],
  DK: [DK.cvr],
  ES: [ES.nif],
  EE: [EE.kmkr],
  FI: [FI.alv],
  FR: [FR.tva],
  GR: [GR.vat],
  HU: [HU.anum],
  IE: [IE.vat],
  IT: [IT.iva],
  LT: [LT.pvm],
  LU: [LU.tva],
  LV: [LV.pvn],
  MT: [MT.vat],
  NL: [NL.btw],
  PL: [PL.nip],
  PT: [PT.nif], // same as PR.nipc
  RO: [RO.cif],
  SE: [SE.vat],
  SI: [SI.ddv],
  SK: [SK.dph],
};

/**
 *  Apply the necessary validators for a given country to validate an ID number
 */
export function validatePerson(
  country: string,
  value: string,
): { checked: boolean; isValid?: boolean; matchedValidators?: Validator[] } {
  const vset = personValidators[country.toLocaleUpperCase()];

  if (!vset || vset.length === 0) {
    return { checked: false };
  }

  const match = vset.filter(grp => grp.validate(value).isValid);

  return { checked: true, isValid: match.length > 0, matchedValidators: match };
}

/**
 *  Apply the necessary validators for a given country to validate an Entity (Business) ID number
 */
export function validateEntity(
  country: string,
  value: string,
): { checked: boolean; isValid?: boolean; matchedValidators?: Validator[] } {
  const vset = entityValidators[country.toLocaleUpperCase()];

  if (!vset || vset.length === 0) {
    return { checked: false };
  }

  const match = vset.filter(grp => grp.validate(value).isValid);

  return { checked: true, isValid: match.length > 0, matchedValidators: match };
}

/**
 * Validate a passport number for a given country.
 *
 * @param countryCode - ISO 3166-1 alpha-2 country code (e.g., 'BR', 'US', 'DE')
 * @param value - Passport number to validate
 */
export function validatePassport(
  countryCode: string,
  value: string,
): ReturnType<Validator['validate']> {
  const country = stdnum[countryCode.toLocaleUpperCase()];

  if (!country || !country.passport) {
    return { isValid: false, error: new exceptions.InvalidComponent() };
  }

  return country.passport.validate(value);
}

/**
 * Format a passport number for a given country.
 * Returns the value unchanged if the country is unsupported.
 */
export function formatPassport(countryCode: string, value: string): string {
  const country = stdnum[countryCode.toLocaleUpperCase()];

  if (!country || !country.passport) {
    return value;
  }

  return country.passport.format(value);
}

/**
 * Compact a passport number for a given country.
 * Returns the value unchanged if the country is unsupported.
 */
export function compactPassport(countryCode: string, value: string): string {
  const country = stdnum[countryCode.toLocaleUpperCase()];

  if (!country || !country.passport) {
    return value;
  }

  return country.passport.compact(value);
}

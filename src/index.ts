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
import * as DZ from './dz';
import * as EC from './ec';
import * as EE from './ee';
import * as EG from './eg';
import * as ES from './es';
import * as FI from './fi';
import * as FO from './fo';
import * as FR from './fr';
import * as GB from './gb';
import * as GH from './gh';
import * as GR from './gr';
import * as GN from './gn';
import * as GT from './gt';
import * as HK from './hk';
import * as HR from './hr';
import * as HU from './hu';
import * as ID from './id';
import * as IE from './ie';
import * as IL from './il';
import * as IN from './in';
import * as IS from './is';
import * as IT from './it';
import * as JP from './jp';
import * as KE from './ke';
import * as KR from './kr';
import * as LI from './li';
import * as LT from './lt';
import * as LU from './lu';
import * as LV from './lv';
import * as MA from './ma';
import * as MC from './mc';
import * as MD from './md';
import * as ME from './me';
import * as MK from './mk';
import * as MT from './mt';
import * as MU from './mu';
import * as MX from './mx';
import * as MY from './my';
import * as NL from './nl';
import * as NO from './no';
import * as NZ from './nz';
import * as PE from './pe';
import * as PK from './pk';
import * as PL from './pl';
import * as PT from './pt';
import * as PY from './py';
import * as RO from './ro';
import * as RS from './rs';
import * as RU from './ru';
import * as SE from './se';
import * as SG from './sg';
import * as SI from './si';
import * as SK from './sk';
import * as SM from './sm';
import * as SV from './sv';
import * as TH from './th';
import * as TN from './tn';
import * as TR from './tr';
import * as TW from './tw';
import * as UA from './ua';
import * as US from './us';
import * as UY from './uy';
import * as VE from './ve';
import * as VN from './vn';
import * as ZA from './za';
import { Validator } from './types';

export { Validator } from './types';

// Live an uppercase world, to prevent keyword collisions
export const stdnum: Record<string, Record<string, Validator>> = {
  AD,
  AL,
  AR,
  AT,
  AU,
  AZ,
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
  DK,
  DO,
  DZ,
  EC,
  EE,
  EG,
  ES,
  FI,
  FO,
  FR,
  GB,
  GH,
  GR,
  GN,
  GT,
  HK,
  HR,
  HU,
  ID,
  IE,
  IL,
  IN,
  IS,
  IT,
  LI,
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
  MT,
  MU,
  MX,
  MY,
  NL,
  NO,
  NZ,
  PE,
  PK,
  PL,
  PT,
  PY,
  RO,
  RS,
  RU,
  SE,
  SG,
  SI,
  SK,
  SM,
  SV,
  TH,
  TN,
  TR,
  TW,
  UA,
  US,
  UY,
  VE,
  VN,
  ZA,
};

export const personValidators: Record<string, Validator[]> = {
  AD: [AD.nrt],
  AL: [AL.nipt],
  AR: [AR.cuit, AR.dni],
  AT: [AT.vnr],
  AU: [AU.tfn],
  AZ: [AZ.pin, AZ.tin],
  BA: [BA.jmbg],
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
  FI: [FI.hetu],
  FR: [FR.nif, FR.nir],
  GB: [GB.nino, GB.utr],
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
  KR: [KR.rrn],
  LI: [LI.peid],
  LT: [LT.asmens],
  LV: [LV.pvn],
  ME: [ME.jmbg],
  MK: [MK.jmbg],
  MU: [MU.nid],
  MX: [MX.curp, MX.rfc],
  MY: [MY.nric],
  NL: [NL.onderwijsnummer, NL.bsn],
  NO: [NO.fodselsnummer],
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
  UA: [UA.edrpou],
  US: [US.ssn],
  UY: [UY.nie, UY.cedula],
  ZA: [ZA.tin, ZA.idnr],
};

export const entityValidators: Record<string, Validator[]> = {
  AD: [AD.nrt],
  AL: [AL.nipt],
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
  NL: [NL.btw],
  NO: [NO.mva, NO.orgnr],
  NZ: [NZ.ird],
  PE: [PE.ruc],
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
  TW: [TW.ubn],
  UA: [UA.rntrc],
  US: [US.ein],
  UY: [UY.rut],
  VN: [VN.mst],
  ZA: [ZA.tin],
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

import AD from './ad';
import AI from './ai';
import AL from './al';
import AR from './ar';
import AT from './at';
import AU from './au';
import AZ from './az';
import BA from './ba';
import BE from './be';
import BG from './bg';
import BO from './bo';
import BR from './br';
import BY from './by';
import BZ from './bz';
import CA from './ca';
import CH from './ch';
import CL from './cl';
import CN from './cn';
import CO from './co';
import CR from './cr';
import CU from './cu';
import CY from './cy';
import CZ from './cz';
import DE from './de';
import DK from './dk';
import DO from './do';
import DZ from './dz';
import EC from './ec';
import EE from './ee';
import EG from './eg';
import ES from './es';
import FI from './fi';
import FO from './fo';
import FR from './fr';
import GB from './gb';
import GH from './gh';
import GR from './gr';
import GN from './gn';
import GT from './gt';
import HK from './hk';
import HR from './hr';
import HU from './hu';
import ID from './id';
import IE from './ie';
import IL from './il';
import IN from './in';
import IS from './is';
import IT from './it';
import JP from './jp';
import KE from './ke';
import KR from './kr';
import LI from './li';
import LT from './lt';
import LU from './lu';
import LV from './lv';
import MA from './ma';
import MC from './mc';
import MD from './md';
import ME from './me';
import MK from './mk';
import MT from './mt';
import MU from './mu';
import MX from './mx';
import MY from './my';
import NL from './nl';
import NO from './no';
import NZ from './nz';
import PE from './pe';
import PK from './pk';
import PL from './pl';
import PT from './pt';
import PY from './py';
import RO from './ro';
import RS from './rs';
import RU from './ru';
import SE from './se';
import SG from './sg';
import SI from './si';
import SK from './sk';
import SM from './sm';
import SV from './sv';
import TH from './th';
import TN from './tn';
import TR from './tr';
import TW from './tw';
import UA from './ua';
import US from './us';
import UY from './uy';
import VE from './ve';
import VN from './vn';
import ZA from './za';
import { Validator } from './types/types';
import { type StdnumEnum } from './types/stdnum';
import { EntityValidatorsEnum } from './types/entityValidators';
import { PersonValidatorsEnum } from './types/personValidators';
import { EuVatEnum } from './types/euVat';

export { type Validator } from './types/types';

// Live an uppercase world, to prevent keyword collisions
export const stdnum: StdnumEnum = {
  AD,
  AI,
  AL,
  AR,
  AT,
  AU,
  AZ,
  BA,
  BE,
  BG,
  BO,
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
  GN,
  GR,
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
  JP,
  KE,
  KR,
  LI,
  LT,
  LU,
  LV,
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

export const personValidators: Record<PersonValidatorsEnum, Validator[]> = {
  AD: [AD.nrt],
  AI: [AI.tin],
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
  TW: [TW.ubn],
  UA: [UA.rntrc],
  US: [US.ssn],
  UY: [UY.nie, UY.cedula],
  VN: [VN.mst],
  ZA: [ZA.tin, ZA.idnr],
};

export const entityValidators: Record<EntityValidatorsEnum, Validator[]> = {
  AD: [AD.nrt],
  AI: [AI.tin],
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
  UA: [UA.edrpou],
  US: [US.ein],
  UY: [UY.rut],
  VN: [VN.mst],
  ZA: [ZA.tin, ZA.vat],
};

/**
 * https://en.wikipedia.org/wiki/VAT_identification_number
 */
export const euVat: Record<EuVatEnum, Validator[]> = {
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
  country: PersonValidatorsEnum,
  value: string,
): { checked: boolean; isValid?: boolean; matchedValidators?: Validator[] } {
  const vset = personValidators[country];

  if (!vset || vset.length === 0) {
    return { checked: false };
  }

  const match = vset.filter((grp) => grp.validate(value).isValid);

  return { checked: true, isValid: match.length > 0, matchedValidators: match };
}

/**
 *  Apply the necessary validators for a given country to validate an Entity (Business) ID number
 */
export function validateEntity(
  country: EntityValidatorsEnum,
  value: string,
): { checked: boolean; isValid?: boolean; matchedValidators?: Validator[] } {
  const vset = entityValidators[country];

  if (!vset || vset.length === 0) {
    return { checked: false };
  }

  const match = vset.filter((grp) => grp.validate(value).isValid);

  return { checked: true, isValid: match.length > 0, matchedValidators: match };
}

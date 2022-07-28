// Source: https://webarchive.nationalarchives.gov.uk/ukgwa/20120207170042/http://www.hmrc.gov.uk/softwaredevelopers/rti/mig-rti-nvreq.pdf
// (Page 46)
const PREFIXES = new Set([
  'AA', 'AB', 'AE', 'AH', 'AK', 'AL', 'AM', 'AP', 'AR', 'AS', 'AT', 'AW', 'AX', 'AY', 'AZ',
  'BA', 'BB', 'BE', 'BH', 'BK', 'BL', 'BM', 'BT',
  'CA', 'CB', 'CE', 'CH', 'CK', 'CL', 'CR',
  'EA', 'EB', 'EE', 'EH', 'EK', 'EL', 'EM', 'EP', 'ER', 'ES', 'ET', 'EW', 'EX', 'EY', 'EZ',
  'GY',
  'HA', 'HB', 'HE', 'HH', 'HK', 'HL', 'HM', 'HP', 'HR', 'HS', 'HT', 'HW', 'HX', 'HY', 'HZ',
  'JA', 'JB', 'JC', 'JE', 'JG', 'JH', 'JJ', 'JK', 'JL', 'JM', 'JN', 'JP', 'JR', 'JS', 'JT', 'JW', 'JX', 'JY', 'JZ',
  'KA', 'KB', 'KE', 'KH', 'KK', 'KL', 'KM', 'KP', 'KR', 'KS', 'KT', 'KW', 'KX', 'KY', 'KZ',
  'LA', 'LB', 'LE', 'LH', 'LK', 'LL', 'LM', 'LP', 'LR', 'LS', 'LT', 'LW', 'LX', 'LY', 'LZ',
  'MA', 'MW', 'MX',
  'NA', 'NB', 'NE', 'NH', 'NL', 'NM', 'NP', 'NR', 'NS', 'NW', 'NX', 'NY', 'NZ',
  'OA', 'OB', 'OE', 'OH', 'OK', 'OL', 'OM', 'OP', 'OR', 'OS', 'OX',
  'PA', 'PB', 'PC', 'PE', 'PG', 'PH', 'PJ', 'PK', 'PL', 'PM', 'PN', 'PP', 'PR', 'PS', 'PT', 'PW', 'PX', 'PY',
  'RA', 'RB', 'RE', 'RH', 'RK', 'RM', 'RP', 'RR', 'RS', 'RT', 'RW', 'RX', 'RY', 'RZ',
  'SA', 'SB', 'SC', 'SE', 'SG', 'SH', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SP', 'SR', 'SS', 'ST', 'SW', 'SX', 'SY', 'SZ',
  'TA', 'TB', 'TE', 'TH', 'TK', 'TL', 'TM', 'TP', 'TR', 'TS', 'TT', 'TW', 'TX', 'TY', 'TZ',
  'WA', 'WB', 'WE', 'WK', 'WL', 'WM', 'WP',
  'YA', 'YB', 'YE', 'YH', 'YK', 'YL', 'YM', 'YP', 'YR', 'YS', 'YT', 'YW', 'YX', 'YY', 'YZ',
  'ZA', 'ZB', 'ZE', 'ZH', 'ZK', 'ZL', 'ZM', 'ZP', 'ZR', 'ZS', 'ZT', 'ZW', 'ZX', 'ZY',
]);

export default PREFIXES;

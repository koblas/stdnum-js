import { strings, isValidDateCompactYYYYMMDD } from '../util';

function getApproximatelyNow() {
  const ONE_DAY = 1000 * 60 * 60 * 24;
  return new Date(Date.now() + ONE_DAY);
}

function isInPast(date: string | number): boolean {
  return new Date(String(date)) <= getApproximatelyNow();
}

function getFullYears(yy: string | number): number[] {
  const yval = typeof yy === 'string' ? parseInt(yy, 10) : yy;

  return [1900 + yval, 2000 + yval];
}

function getFirstSix(number: string): string {
  return strings.splitAt(number, 6)[0];
}

function getBaseNumber(number: string): string {
  return strings.splitAt(number, 9)[0];
}

function getChecksum(number: string): number {
  const checksumString = strings.splitAt(number, 9)[1];
  return parseInt(checksumString, 10);
}

export function toDateArray(number: string): string[] {
  const [yy, mm, dd] = strings.splitAt(number, 2, 4, 6);

  return [yy, mm, dd];
}

function getValidPastDates(yymmdd: string): Array<string> {
  const [yy, mm, dd] = toDateArray(yymmdd);

  return getFullYears(yy)
    .filter(yyyy => isValidDateCompactYYYYMMDD(`${yyyy}${mm}${dd}`))
    .map(yyyy => `${yyyy}-${mm}-${dd}`)
    .filter(isInPast);
}

function isUnknownDob(dob: string): boolean {
  if (['000001', '002001', '004001'].includes(dob)) {
    return true;
  }

  const [yy, mm, dd] = toDateArray(dob);

  return strings.isdigits(yy) && mm === '00' && strings.isdigits(dd);
}

function toChecksumBasis(year: number, baseNumber: string): number {
  return parseInt(year < 2000 ? baseNumber : `${2}${baseNumber}`, 10);
}

function isValidDob(dob: string): boolean {
  return Boolean(getValidPastDates(dob).length);
}

function defaultToDob(origFirstSix: string): string {
  return origFirstSix;
}

function isValidFirstSix(
  firstSix: string,
  toDob: typeof defaultToDob,
): boolean {
  const dob = toDob(firstSix);
  return isUnknownDob(dob) || isValidDob(dob);
}

export function validStructure(
  number: string,
  toDob: typeof defaultToDob = defaultToDob,
): boolean {
  const firstSix = getFirstSix(number);
  return isValidFirstSix(firstSix, toDob);
}

function getChecksumBasesUnknownDob(baseNumber: string): Array<number> {
  const firstSix = getFirstSix(baseNumber);
  const [yy] = toDateArray(firstSix);

  return getFullYears(yy)
    .filter(isInPast)
    .map(year => toChecksumBasis(year, baseNumber));
}

function getChecksumBasesForStandardDob(
  baseNumber: string,
  toDob: typeof defaultToDob,
): Array<number> {
  const firstSix = getFirstSix(baseNumber);
  const dob = toDob(firstSix);
  const validPastDates = getValidPastDates(dob);
  const extractYearFromDate = (date: string): number =>
    parseInt(date.split('-')[0], 10);
  const validPastYears = validPastDates.map(extractYearFromDate);
  return validPastYears.map(year => toChecksumBasis(year, baseNumber));
}

function getChecksumBases(
  number: string,
  toDob: typeof defaultToDob,
): Array<number> {
  const firstSix = getFirstSix(number);
  const dob = toDob(firstSix);
  const baseNumber = getBaseNumber(number);

  if (isUnknownDob(dob)) return getChecksumBasesUnknownDob(baseNumber);

  return getChecksumBasesForStandardDob(baseNumber, toDob);
}

function isValidChecksumPair(checksumBasis: number, checksum: number): boolean {
  return !((checksumBasis + checksum) % 97);
}

export function validChecksum(
  number: string,
  toDob: typeof defaultToDob = defaultToDob,
): boolean {
  const checksumBases = getChecksumBases(number, toDob);
  const checksum = getChecksum(number);
  return checksumBases.some(csb => isValidChecksumPair(csb, checksum));
}

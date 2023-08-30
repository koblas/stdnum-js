import { splitAt } from './strings';

export function validBirthdate(date: Date | null): boolean {
  if (date === null) {
    return false;
  }

  const now = new Date();
  return date.getTime() <= now.getTime();
}

export function buildDate(yy: string, mm: string, dd: string): Date | null {
  const yyN = parseInt(yy, 10);
  const mmN = parseInt(mm, 10) - 1;
  const ddN = parseInt(dd, 10);

  if (Number.isNaN(yyN) || Number.isNaN(mmN) || Number.isNaN(ddN)) {
    return null;
  }

  let d;
  if (yyN < 20) {
    d = new Date(2000 + yyN, mmN, ddN);
  } else if (yyN < 100) {
    d = new Date(1900 + yyN, mmN, ddN);
  } else {
    d = new Date(yyN, mmN, ddN);
  }

  if (Number.isNaN(d.getFullYear())) {
    return null;
  }

  // Date will convert Jan 30 -> Feb 9, make sure this didn't happen
  if (d.getDate() !== ddN || d.getMonth() !== mmN) {
    return null;
  }

  return d;
}

/** Check to make sure this is a valid date
 *  isBefore checks to make sure that the date is today or before, this
 *  typically is used for birtdays (you could be born today)
 */
export function isValidDate(
  yy: string,
  mm: string,
  dd: string,
  isBefore = false,
): boolean {
  const d = buildDate(yy, mm, dd);

  if (d === null) {
    return false;
  }

  return isBefore ? validBirthdate(d) : true;
}

/** Check to make sure this is a valid date */
export function isValidDateCompactYYMMDD(
  yymmdd: string,
  isBefore = false,
): boolean {
  const [year, mon, day] = splitAt(yymmdd, 2, 4);

  return isValidDate(year, mon, day, isBefore);
}

export function isValidDateCompactDDMMYY(
  ddmmyy: string,
  isBefore = false,
): boolean {
  const [day, mon, year] = splitAt(ddmmyy, 2, 4);

  return isValidDate(year, mon, day, isBefore);
}

export function isValidDateCompactYYYYMMDD(
  yyyymmdd: string,
  isBefore = false,
): boolean {
  const [year, mon, day] = splitAt(yyyymmdd, 4, 6);

  return isValidDate(year, mon, day, isBefore);
}

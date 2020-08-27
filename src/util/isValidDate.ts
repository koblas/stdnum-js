/** Check to make sure this is a valid date */
export function isValidDateCompact(yymmdd: string): boolean {
  return isValidDate(yymmdd.substr(0, 2), yymmdd.substr(2, 2), yymmdd.substr(4, 2));
}

/** Check to make sure this is a valid date */
export function isValidDate(yy: string, mm: string, dd: string): boolean {
  const yyN = parseInt(yy, 10);
  const mmN = parseInt(mm, 10) - 1;
  const ddN = parseInt(dd, 10);

  if (isNaN(yyN) || isNaN(mmN) || isNaN(ddN)) {
    return false;
  }

  let d;
  if (yyN < 20) {
    d = new Date(2000 + yyN, mmN, ddN);
  } else if (yyN < 100) {
    d = new Date(1900 + yyN, mmN, ddN);
  } else {
    d = new Date(yyN, mmN, ddN);
  }

  if (isNaN(d.getFullYear())) {
    return false;
  }

  // Date will convert Jan 30 -> Feb 9, make sure this didn't happen
  if (d.getDate() !== ddN || d.getMonth() !== mmN) {
    return false;
  }

  return true;
}

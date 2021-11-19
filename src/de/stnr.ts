/**
 * St.-Nr. (Steuernummer, German tax number).
 *
 * The Steuernummer (St.-Nr.) is a tax number assigned by regional tax offices
 * to taxable individuals and organisations. The number is being replaced by the
 * Steuerliche Identifikationsnummer (IdNr).
 * The number has 10 or 11 digits for the regional form (per Bundesland) and 13
 * digits for the number that is unique within Germany. The number consists of
 * (part of) the Bundesfinanzamtsnummer (BUFA-Nr.), a district number, a serial
 * number and a check digit.
 *
 * Source
 *    https://de.wikipedia.org/wiki/Steuernummer
 *
 * PERSON/ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

type Match =
  | { match: false }
  | {
      match: true;
      f: string;
      b: string;
      u: string;
      p: string;
    };

type MFunc = (v: string) => Match;

function buildMatch(fmt: string): MFunc {
  const pattern = fmt.replace(/([FBUP])\1*/g, m => {
    return `(\\d{${m.length}})`;
  });
  const matcher = new RegExp(`^${pattern}$`);

  return (value: string): Match => {
    const m = matcher.exec(value);

    if (!m) {
      return { match: false };
    }

    return {
      match: true,
      f: m[1] ?? '',
      b: m[2] ?? '',
      u: m[3] ?? '',
      p: m[4] ?? '',
    };
  };
}

function buildMatcher(
  rfmt: string,
  cfmt: string,
): {
  region: MFunc;
  country: MFunc;
} {
  return {
    region: buildMatch(rfmt),
    country: buildMatch(cfmt),
  };
}

const REGION_FORMATS = {
  'DE-BW': buildMatcher('FFBBBUUUUP', '28FF0BBBUUUUP'),
  'DE-BY': buildMatcher('FFFBBBUUUUP', '9FFF0BBBUUUUP'),
  'DE-BE': buildMatcher('FFBBBUUUUP', '11FF0BBBUUUUP'),
  'DE-BB': buildMatcher('0FFBBBUUUUP', '30FF0BBBUUUUP'),
  'DE-HB': buildMatcher('FFBBBUUUUP', '24FF0BBBUUUUP'),
  'DE-HH': buildMatcher('FFBBBUUUUP', '22FF0BBBUUUUP'),
  'DE-HE': buildMatcher('0FFBBBUUUUP', '26FF0BBBUUUUP'),
  'DE-MV': buildMatcher('0FFBBBUUUUP', '40FF0BBBUUUUP'),
  'DE-NI': buildMatcher('FFBBBUUUUP', '23FF0BBBUUUUP'),
  'DE-NW': buildMatcher('FFFBBBBUUUP', '5FFF0BBBBUUUP'),
  'DE-RP': buildMatcher('FFBBBUUUUP', '27FF0BBBUUUUP'),
  'DE-SL': buildMatcher('0FFBBBUUUUP', '10FF0BBBUUUUP'),
  'DE-SN': buildMatcher('2FFBBBUUUUP', '32FF0BBBUUUUP'),
  'DE-ST': buildMatcher('1FFBBBUUUUP', '31FF0BBBUUUUP'),
  'DE-SH': buildMatcher('FFBBBUUUUP', '21FF0BBBUUUUP'),
  'DE-TH': buildMatcher('1FFBBBUUUUP', '41FF0BBBUUUUP'),
};

function findMatch(value: string): Match | null {
  let result: Match | null = null;

  Object.values(REGION_FORMATS).some(({ region, country }) => {
    const rResult = region(value);
    if (rResult.match) {
      result = rResult;

      return true;
    }
    const cResult = country(value);
    if (cResult.match) {
      result = cResult;

      return true;
    }

    return false;
  });

  return result;
}

const impl: Validator = {
  name: 'German Tax Number',
  localName: 'Steuernummer',
  abbreviation: ' St.-Nr.',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    const match = findMatch(input);

    if (!match || !match.match) {
      return value;
    }

    return `${match.f}/${match.b}/${match.u} ${match.p}`;
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (![10, 11, 13].includes(value.length)) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidFormat() };
    }

    const front = value.split('').map(v => parseInt(v, 10));
    const check = front.pop();

    const product = front.reduce((acc, v) => {
      let sum = (v + acc) % 10;
      if (sum === 0) {
        sum = 10;
      }

      return (sum * 2) % 11;
    }, 10);

    let checksum = 11 - product;
    if (checksum === 10) {
      checksum = 0;
    }

    if (checksum !== check) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: false,
      isEntity: true,
    };
  },
};

export const {
  name,
  localName,
  abbreviation,
  validate,
  format,
  compact,
} = impl;

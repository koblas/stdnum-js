/**
 *
 * Abgabenkontonummer (Austrian tax identification number).
 *
 * The Austrian tax identification number (Abgabenkontonummer) consists of 2
 * digits for the issuing tax office (Finanzamtsnummer) and 7 digits for the
 * subject and a check digit (Steuernummer).
 *
 *
 * Sources:
 *    https://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/Austria-TIN.pdf
 *    https://de.wikipedia.org/wiki/Abgabenkontonummer
 *    https://service.bmf.gv.at/Service/Anwend/Behoerden/show_mast.asp
 *
 * ENTITY
 */

import * as exceptions from '../exceptions';
import { strings } from '../util';
import { Validator, ValidateReturn } from '../types';

// List of Finanzamtsnummern was manually generated from
// https://de.wikipedia.org/wiki/Abgabenkontonummer
const faOffices: Record<string, { office: string; region: string }> = {
  '03': { office: 'Wien 3/6/7/11/15 Schwechat Gerasdorf', region: 'Wien' },
  '04': { office: 'Wien 4/5/10', region: 'Wien' },
  '06': { office: 'Wien 8/16/17', region: 'Wien' },
  '07': { office: 'Wien 9/18/19 Klosterneuburg', region: 'Wien' },
  '08': { office: 'Wien 12/13/14 Purkersdorf', region: 'Wien' },
  '09': { office: 'Wien 1/23', region: 'Wien' },
  '10': { office: 'für Gebühren, Verkehrsteuern und Glücksspiel', region: '' },
  '12': { office: 'Wien 2/20/21/22', region: 'Wien' },
  '15': { office: 'Amstetten Melk Scheibbs', region: 'Niederösterreich' },
  '16': { office: 'Baden Mödling', region: 'Niederösterreich' },
  '18': { office: 'Gänserndorf Mistelbach', region: 'Niederösterreich' },
  '22': { office: 'Hollabrunn Korneuburg Tulln', region: 'Niederösterreich' },
  '23': { office: 'Waldviertel', region: 'Niederösterreich' },
  '29': { office: 'Lilienfeld St. Pölten', region: 'Niederösterreich' },
  '33': { office: 'Neunkirchen Wr. Neustadt', region: 'Niederösterreich' },
  '38': {
    office: 'Bruck Eisenstadt Oberwart',
    region: 'Burgenland, Niederösterreich',
  },
  '41': { office: 'Braunau Ried Schärding', region: 'Oberösterreich' },
  '46': { office: 'Linz', region: 'Oberösterreich' },
  '51': { office: 'Kirchdorf Perg Steyr', region: 'Oberösterreich' },
  '52': { office: 'Freistadt Rohrbach Urfahr', region: 'Oberösterreich' },
  '53': { office: 'Gmunden Vöcklabruck', region: 'Oberösterreich' },
  '54': { office: 'Grieskirchen Wels', region: 'Oberösterreich' },
  '57': { office: 'Klagenfurt', region: 'Kärnten' },
  '59': { office: 'St. Veit Wolfsberg', region: 'Kärnten' },
  '61': { office: 'Spittal Villach', region: 'Kärnten' },
  '65': { office: 'Bruck Leoben Mürzzuschlag', region: 'Steiermark' },
  '67': { office: 'Oststeiermark', region: 'Steiermark' },
  '68': { office: 'Graz-Stadt', region: 'Steiermark' },
  '69': { office: 'Graz-Umgebung', region: 'Steiermark' },
  '71': { office: 'Judenburg Liezen', region: 'Steiermark' },
  '72': { office: 'Deutschlandsberg Leibnitz Voitsberg', region: 'Steiermark' },
  '81': { office: 'Innsbruck', region: 'Tirol' },
  '82': { office: 'Kitzbühel Lienz', region: 'Tirol' },
  '83': { office: 'Kufstein Schwaz', region: 'Tirol' },
  '84': { office: 'Landeck Reutte', region: 'Tirol' },
  '90': { office: 'St. Johann Tamsweg Zell am See', region: 'Salzburg' },
  '91': { office: 'Salzburg-Stadt', region: 'Salzburg' },
  '93': { office: 'Salzburg-Land', region: 'Salzburg' },
  '97': { office: 'Bregenz', region: 'Vorarlberg' },
  '98': { office: 'Feldkirch', region: 'Vorarlberg' },
};

function clean(input: string): ReturnType<typeof strings.cleanUnicode> {
  return strings.cleanUnicode(input, ' -./,');
}

const impl: Validator = {
  name: 'Austrian Tax Identification Number',
  localName: 'Abgabenkontonummer',
  abbreviation: 'TIN',
  compact(input: string): string {
    const [value, err] = clean(input);

    if (err) {
      throw err;
    }

    return value;
  },

  format(input: string): string {
    const [value] = clean(input);

    const [a, b, c] = strings.splitAt(value, 2, 5);

    return `${a}-${b}/${c}`;
  },

  validate(input: string): ValidateReturn {
    const [value, error] = clean(input);

    if (error) {
      return { isValid: false, error };
    }
    if (value.length !== 9) {
      return { isValid: false, error: new exceptions.InvalidLength() };
    }
    if (!strings.isdigits(value)) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const [office, front, check] = strings.splitAt(value, 2, 8);

    if (faOffices[office] === undefined) {
      return { isValid: false, error: new exceptions.InvalidComponent() };
    }

    const sum = `${office}${front}`
      .split('')
      .map(x => parseInt(x, 10))
      .reduce(
        (acc, digit, idx) =>
          acc + (idx % 2 === 1 ? [0, 2, 4, 6, 8, 1, 3, 5, 7, 9][digit] : digit),
        0,
      );

    const digit = String((10 - (sum % 10)) % 10);

    if (check !== digit) {
      return { isValid: false, error: new exceptions.InvalidChecksum() };
    }

    return {
      isValid: true,
      compact: value,
      isIndividual: false,
      isCompany: true,
    };
  },
};

export const { name, localName, abbreviation, validate, format, compact } =
  impl;

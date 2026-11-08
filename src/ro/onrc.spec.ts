import { validate, format } from './onrc';
import {
  InvalidChecksum,
  InvalidComponent,
  InvalidFormat,
  InvalidLength,
} from '../exceptions';

describe('ro/onrc', () => {
  it('format:J52/750/2012', () => {
    const result = format('J52/750/2012');

    expect(result).toEqual('J52/750/2012');
  });

  it('validate:J52/750/2012', () => {
    const result = validate('J52/750/2012');

    expect(result.isValid && result.compact).toEqual('J52/750/2012');
  });

  it('validate:J52/750/03.07.2012', () => {
    const result = validate('J52/750/03.07.2012');

    expect(result.isValid && result.compact).toEqual('J52/750/2012');
  });

  it('validate:X52/750/2012', () => {
    const result = validate('X52/750/2012');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('format:F5/1055/2013', () => {
    const result = format('F5/1055/2013');

    expect(result).toEqual('F05/1055/2013');
  });

  it.each([
    ['F5/1055/2013', 'F05/1055/2013'],
    ['J5/1243/2016', 'J05/1243/2016'],
    ['J/2/750/2012', 'J02/750/2012'],
    ['J1/384/13.05.2015', 'J01/384/2015'],
  ])('validate:%s', (input: string, compact: string) => {
    const result = validate(input);

    expect(result.isValid && result.compact).toEqual(compact);
  });

  it.each([
    ['J/52/750/2012', 'J52/750/2012'],
    ['J 52 / 750 / 2012', 'J52/750/2012'],
    [' J52/750/2012 ', 'J52/750/2012'],
    ['F 26 1132/2007', 'F26/1132/2007'],
    ['J22-1515-2007', 'J22/1515/2007'],
  ])('validate:%s', (input: string, compact: string) => {
    const result = validate(input);

    expect(result.isValid && result.compact).toEqual(compact);
  });

  it('validate:J22/1515/2007/123', () => {
    const result = validate('J22/1515/2007/123');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it.each(['J52/100000/2012', 'J 52 / 750 / 200'])(
    'validate:%s',
    (input: string) => {
      const result = validate(input);

      expect(result.error).toBeInstanceOf(InvalidLength);
    },
  );

  it.each([
    'J00/750/2012',
    'J41/750/2012',
    'J49/750/2012',
    'J002 /123 /2015',
    'J/52/750/1989',
    'J/52/750/2112',
  ])('validate:%s', (input: string) => {
    const result = validate(input);

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('format:J2025007112004', () => {
    const result = format('J2025007112004');

    expect(result).toEqual('J2025007112004');
  });

  it.each([
    'J2025007112004',
    'J2012000750528',
    'C2005000007045',
    'J2016012984401',
    'J2024012585407',
    'J2024035703000',
  ])('validate:%s', (input: string) => {
    const result = validate(input);

    expect(result.isValid && result.compact).toEqual(input);
  });

  it('validate:J2012000750529', () => {
    const result = validate('J2012000750529');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:J201601298440', () => {
    const result = validate('J201601298440');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it.each([
    'J1822012984405', // year too old
    'J2112012984408', // year in the future
    'J2016012984007', // county 00 before 2024
    'J2024012984994', // invalid county in 2024
    'J2025012984401', // county other than 00 after 2024
  ])('validate:%s', (input: string) => {
    const result = validate(input);

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });
});

import { validate, format, compact } from './personnummer';
import {
  InvalidLength,
  InvalidChecksum,
  InvalidComponent,
} from '../exceptions';

describe('se/personnummer', () => {
  test.each([
    ['8803200017', '880320-0017'], // no hyphen assume young person
    ['880320-0017', '880320-0017'], // standard format
    ['880320+0017', '880320+0017'], // standard format, person over 100
    ['19200901-0000', '200901+0000'], // 4digit year, hypen that's useless person over 100
    ['192009010000', '200901+0000'], // 4digit year, no hyphen, person over 100
    ['20200901-0000', '200901-0000'], // 4digit year, hyphen
    ['202009010000', '200901-0000'], // 4digit year, no hyphen
  ])('format:%s', (given, want) => {
    const result = format(given);

    expect(result).toEqual(want);
  });

  // compact() returns the 12 digit YYYYMMDDNNNN form, which is unambiguous
  // and recommended for storage (#117)
  test.each([
    ['880320-0016', '198803200016'],
    ['8803200016', '198803200016'],
    ['880320+0016', '188803200016'],
    ['19880320-0016', '198803200016'],
    ['19880320+0016', '198803200016'], // 4 digit year wins over the sign
    ['198803200016', '198803200016'],
  ])('compact:%s', (given, want) => {
    expect(compact(given)).toEqual(want);
  });

  describe('format around the 100th birthday', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2026-03-01T12:00:00Z'));
    });
    afterEach(() => {
      vi.useRealTimers();
    });

    // '+' applies from the calendar year someone turns 100
    // (Folkbokföringslagen 1991:481 §18), not from the birthday itself
    test.each([
      ['19261231-1234', '261231+1234'],
      ['19270101-1234', '270101-1234'],
    ])('format:%s', (given, want) => {
      expect(format(given)).toEqual(want);
    });
  });

  it('validate:880320-0016', () => {
    const result = validate('880320-0016');

    expect(result.isValid && result.compact).toEqual('198803200016');
  });

  // Coordination number ("Samordningsnummer")
  it('validate:701063-2391', () => {
    const result = validate('701063-2391');

    expect(result.isValid && result.compact).toEqual('197010632391');
  });

  test.each(['811228-9874', '670919-9530', '18900102-2384'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.isValid).toEqual(true);
    },
  );

  // The separator is only written between the birth date and the birth number,
  // it is not part of the number (Folkbokföringslagen 1991:481 §18), so the
  // bare 10 and 12 digit forms are valid too.
  test.each([
    ['8803200016', '198803200016'],
    ['8112289874', '198112289874'],
    ['6709199530', '196709199530'],
    ['7010632391', '197010632391'], // coordination number
    ['189001022384', '189001022384'], // 4digit year, no hyphen
  ])('validate:%s', (given, want) => {
    const result = validate(given);

    expect(result.isValid && result.compact).toEqual(want);
  });

  // Examples from #113. With a 4 digit year the year is authoritative: the
  // separator may have been written when the person was under 100, so a
  // "wrong" sign is not an error.
  test.each([
    ['5505260017', '195505260017'],
    ['198902255630', '198902255630'],
    ['19781204+0009', '197812040009'],
    ['19200102-0755', '192001020755'],
  ])('validate:%s', (given, want) => {
    const result = validate(given);

    expect(result.isValid && result.compact).toEqual(want);
  });

  // Personal identity numbers date from 1947, so no holder was born before
  // 1800 (#113)
  test.each(['11900102-2384', '119001022384', '17990101-0000'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.error).toBeInstanceOf(InvalidComponent);
    },
  );

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:880320-0018', () => {
    const result = validate('880320-0018');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:8803200018', () => {
    const result = validate('8803200018');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:198803200018', () => {
    const result = validate('198803200018');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

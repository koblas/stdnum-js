import { validate, format } from './pwnr';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('de/pwnr', () => {
  it('format:T22000129364081252010315D4', () => {
    const result = format('T22000129364081252010315D4');

    expect(result).toEqual('T220001293 6408125 2010315 D 4');
  });

  it('format:1220001297D640812517103198', () => {
    const result = format('1220001297D640812517103198');

    expect(result).toEqual('1220001297 6408125 1710319 D 8');
  });

  test.each([
    '240605568468102030705109D6',
    '2406055684-6810203-0705109-D-6',
    'T22000129364081252010315D4',
    '1220001297D640812517103198',
    '1220001297D640812517103198',
    '1220001297D 6408125 1710319 8',
  ])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toEqual(true);
  });

  test.each([
    '2406055684',
    '2406055684d',
    '2406055684D',
    'T220001293D',
    'T220001293',
    'L01X00T471',
  ])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toEqual(true);
  });

  it('validate:T220001293 6408125 2010315D 4', () => {
    const result = validate('T220001293 6408125 2010315D 4');

    expect(result.isValid && result.compact).toEqual(
      'T22000129364081252010315D4',
    );
  });

  it('validate:T22000129364081252010315D', () => {
    const result = validate('T22000129364081252010315D');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:T22000129364081252010315D9', () => {
    const result = validate('T22000129364081252010315D9');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

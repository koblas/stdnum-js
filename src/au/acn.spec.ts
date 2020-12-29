import { validate, format } from './acn';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('au/acn', () => {
  it('format:004085616', () => {
    const result = format('004085616');

    expect(result).toEqual('004 085 616');
  });

  it('validate:004 085 616', () => {
    const result = validate('004 085 616');

    expect(result.isValid && result.compact).toEqual('004085616');
  });

  it('validate:010 499 966', () => {
    const result = validate('010 499 966');

    expect(result.isValid && result.compact).toEqual('010499966');
  });

  it('validate:0040856169', () => {
    const result = validate('0040856169');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:999 999 999 ', () => {
    const result = validate('999 999 999');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

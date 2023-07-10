import { validate, format } from './mf';
import { InvalidComponent, InvalidFormat } from '../exceptions';

describe('tn/mf', () => {
  it('format:1496298 T P N 000', () => {
    const result = format('1496298 T P N 000');

    expect(result).toEqual('1496298/T/P/N/000');
  });

  it('fvalidate:121J', () => {
    const result = validate('121J');

    expect(result.isValid && result.compact).toEqual('0000121J');
  });

  test.each(['1234567/M/A/E/001', '1282182 W', '121J'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.isValid).toEqual(true);
    },
  );

  it('validate:aaaaaaa/M/A/E/abc', () => {
    const result = validate('aaaaaaa/M/A/E/abc');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it('validate:1234567/M/A/X/000', () => {
    const result = validate('1234567/M/A/X/000');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });
});

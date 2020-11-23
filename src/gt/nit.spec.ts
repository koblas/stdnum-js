import { validate, format } from './nit';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('gt/nit', () => {
  it('format:39525503', () => {
    const result = format('39525503');

    expect(result).toEqual('3952550-3');
  });

  it('validate:576937-K', () => {
    const result = validate('576937-K');

    expect(result.isValid && result.compact).toEqual('576937K');
  });

  it('validate:7108-0', () => {
    const result = validate('7108-0');

    expect(result.isValid && result.compact).toEqual('71080');
  });

  it('validate:1234567890123', () => {
    const result = validate('1234567890123');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:8977112-0', () => {
    const result = validate('8977112-0');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

import { validate, format } from './cn';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('jp/cn', () => {
  it('format:5835678256246', () => {
    const result = format('5835678256246');

    expect(result).toEqual('5-8356-7825-6246');
  });

  it('validate:5-8356-7825-6246', () => {
    const result = validate('5-8356-7825-6246');

    expect(result.isValid && result.compact).toEqual('5835678256246');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:2-8356-7825-6246', () => {
    const result = validate('2-8356-7825-6246');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

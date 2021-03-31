import { validate, format } from './coe';
import { InvalidLength, InvalidFormat } from '../exceptions';

describe('sm/coe', () => {
  it('format:51', () => {
    const result = format('51');

    expect(result).toEqual('51');
  });

  it('validate:51', () => {
    const result = validate('51');

    expect(result.isValid && result.compact).toEqual('51');
  });

  it('validate:024165', () => {
    const result = validate('024165');

    expect(result.isValid && result.compact).toEqual('24165');
  });

  it('validate:2416A', () => {
    const result = validate('2416A');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it('validate:1124165', () => {
    const result = validate('1124165');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

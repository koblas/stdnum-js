import { validate, format } from './orgnr';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('se/orgnr', () => {
  it('format:1234567897', () => {
    const result = format('1234567897');

    expect(result).toEqual('123456-7897');
  });

  it('validate:1234567897', () => {
    const result = validate('1234567897');

    expect(result.isValid && result.compact).toEqual('1234567897');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:1234567891', () => {
    const result = validate('1234567891');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

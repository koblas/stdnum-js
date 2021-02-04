import { validate, format } from './tin';
import { InvalidLength, InvalidFormat } from '../exceptions';

describe('az/tin', () => {
  it('format:123-123-123-1', () => {
    const result = format('123-123-123-1');

    expect(result).toEqual('1231231231');
  });

  it('validate:1231231231', () => {
    const result = validate('1231231231');

    expect(result.isValid && result.compact).toEqual('1231231231');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:1231231233', () => {
    const result = validate('1231231233');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});

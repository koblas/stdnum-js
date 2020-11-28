import { InvalidComponent, InvalidLength } from '../exceptions';
import { validate, format } from './ein';

describe('us/tin', () => {
  it('format:536904399', () => {
    const result = format('536904399');

    expect(result).toEqual('53-6904399');
  });

  it('validate:123-45-6789', () => {
    const result = validate('123-45-6789');

    expect(result.isValid && result.compact).toEqual('123456789');
  });

  it('validate:1234567890123', () => {
    const result = validate('1234567890123');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:00-3456789', () => {
    const result = validate('00-3456789');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });
});

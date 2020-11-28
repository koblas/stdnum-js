import { InvalidComponent, InvalidLength } from '../exceptions';
import { validate, format } from './ssn';

describe('us/ssn', () => {
  it('format:536904399', () => {
    const result = format('536904399');

    expect(result).toEqual('536-90-4399');
  });

  it('validate:536-90-4399', () => {
    const result = validate('536-90-4399');

    expect(result.isValid && result.compact).toEqual('536904399');
  });

  it('validate:1234567890123', () => {
    const result = validate('1234567890123');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:189092294', () => {
    const result = validate('189092294');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });
});

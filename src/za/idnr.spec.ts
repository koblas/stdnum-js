import { validate, format } from './idnr';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('za/idnr', () => {
  it('format:7503305044089', () => {
    const result = format('7503305044089');

    expect(result).toEqual('7503305044089');
  });

  it('validate:7503305044089', () => {
    const result = validate('7503305044089');

    expect(result.isValid && result.compact).toEqual('7503305044089');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:8503305044089', () => {
    const result = validate('8503305044089');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

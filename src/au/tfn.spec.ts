import { validate, format } from './tfn';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('au/tfn', () => {
  it('format:123456782', () => {
    const result = format('123456782');

    expect(result).toEqual('123 456 782');
  });

  it('validate:123 456 782', () => {
    const result = validate('123 456 782');

    expect(result.isValid && result.compact).toEqual('123456782');
  });

  it('validate:1234567', () => {
    const result = validate('1234567');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:999 999 999', () => {
    const result = validate('999 999 999');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

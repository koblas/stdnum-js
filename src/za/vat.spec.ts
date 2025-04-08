import { validate, format } from './vat';
import { InvalidLength, InvalidFormat } from '../exceptions';

describe('za/vat', () => {
  it('format:499 9999 999', () => {
    const result = format('499 9999 999');

    expect(result).toEqual('4999999999');
  });

  it('validate:499 9999 999', () => {
    const result = validate('499 9999 999');

    expect(result.isValid && result.compact).toEqual('4999999999');
  });

  it('validate:499 9999 99', () => {
    const result = validate('499 9999 99');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:399 9999 999', () => {
    const result = validate('399 9999 999');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it('validate:49a 9999 999', () => {
    const result = validate('399 9999 999');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});

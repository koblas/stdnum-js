import { validate, format } from './amka';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('gr/amka', () => {
  it('format:01013099997', () => {
    const result = format('01013099997');

    expect(result).toEqual('01013099997');
  });

  it('validate:01013099997', () => {
    const result = validate('01013099997');

    expect(result.isValid && result.compact).toEqual('01013099997');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:01013099999', () => {
    const result = validate('01013099999');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

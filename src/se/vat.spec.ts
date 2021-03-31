import { validate, format } from './vat';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('se/vat', () => {
  it('format:SE 123456789701', () => {
    const result = format('SE 123456789701');

    expect(result).toEqual('123456789701');
  });

  it('validate:SE 123456789701', () => {
    const result = validate('SE 123456789701');

    expect(result.isValid && result.compact).toEqual('123456789701');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:SE 123456789101', () => {
    const result = validate('SE 123456789101');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

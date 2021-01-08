import { validate, format } from './vat';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('gr/vat', () => {
  it('format:GR 23456783', () => {
    const result = format('GR 23456783');

    expect(result).toEqual('023456783');
  });

  it('validate:GR 23456780', () => {
    const result = validate('GR 23456780');

    expect(result.isValid && result.compact).toEqual('023456780');
  });

  it('validate:EL 094259216', () => {
    const result = validate('EL 094259216');

    expect(result.isValid && result.compact).toEqual('094259216');
  });

  it('validate:1234567', () => {
    const result = validate('1234567');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:123456781', () => {
    const result = validate('123456781');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

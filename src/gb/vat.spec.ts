import { validate, format } from './vat';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('gb/vat', () => {
  it('format:GB 980 7806 84', () => {
    const result = format('GB 980 7806 84');

    expect(result).toEqual('980 7806 84');
  });

  it('validate:GB 980 7806 84', () => {
    const result = validate('GB 980 7806 84');

    expect(result.isValid && result.compact).toEqual('980780684');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:802311781', () => {
    const result = validate('802311781');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

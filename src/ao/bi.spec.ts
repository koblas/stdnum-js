import { validate, format, compact } from './bi';
import { InvalidLength, InvalidFormat } from '../exceptions';

describe('ao/bi', () => {
  it('format:000204688CA010', () => {
    const result = format('000204688CA010');

    expect(result).toEqual('000204688CA010');
  });

  it('compact:000204688CA010', () => {
    const result = compact('000204688CA010');

    expect(result).toEqual('000204688CA010');
  });

  it('validate:007128828LA043', () => {
    const result = validate('007128828LA043');

    expect(result.isValid && result.compact).toEqual('007128828LA043');
  });

  it('validate:0000100441CA037 (invalid length)', () => {
    const result = validate('0000100441CA037');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:123456789 (invalid length)', () => {
    const result = validate('123456789');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:123456789CA12 (invalid length)', () => {
    const result = validate('123456789CA12');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:000204688cA010 (case normalization)', () => {
    const result = validate('000204688cA010');

    if (!result.isValid) {
      throw new Error('Expected valid');
    }
    expect(result.compact).toEqual('000204688CA010');
  });

  it('validate:00020468800010 (invalid pattern - no letters)', () => {
    const result = validate('00020468800010');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});

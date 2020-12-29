import { validate, format } from './abn';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('au/abn', () => {
  it('format:83 914 571 673', () => {
    const result = format('83 914 571 673');

    expect(result).toEqual('83 914 571 673');
  });

  it('validate:83 914 571 673', () => {
    const result = validate('83 914 571 673');

    expect(result.isValid && result.compact).toEqual('83914571673');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:99 999 999 999', () => {
    const result = validate('99 999 999 999');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

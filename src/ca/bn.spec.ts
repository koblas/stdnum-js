import { validate, format } from './bn';
import { InvalidLength, InvalidChecksum, InvalidFormat } from '../exceptions';

describe('ca/bn', () => {
  it('format:123026635RC0001', () => {
    const result = format('123026635RC0001');

    expect(result).toEqual('12302 6635 RC 0001');
  });

  it('validate:12302 6635 RC 0001', () => {
    const result = validate('12302 6635 RC 0001');

    expect(result.isValid && result.compact).toEqual('123026635RC0001');
  });

  it('validate:12302 6635', () => {
    const result = validate('12302 6635');

    expect(result.isValid && result.compact).toEqual('123026635');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:12345678Z', () => {
    const result = validate('12345678Z');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it('validate:123456783', () => {
    const result = validate('123456783');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

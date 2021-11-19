import { validate, format } from './ean';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('gen/ean', () => {
  it('format:73513537', () => {
    const result = format('73513537');

    expect(result).toEqual('73513537');
  });

  it('validate:978-0-471-11709-4', () => {
    const result = validate('978-0-471-11709-4');

    expect(result.isValid && result.compact).toEqual('9780471117094');
  });

  it('validate:98412345678908', () => {
    const result = validate('98412345678908');

    expect(result.isValid && result.compact).toEqual('98412345678908');
  });

  it('validate:123456789', () => {
    const result = validate('123456789');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:98412345678907', () => {
    const result = validate('98412345678907');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

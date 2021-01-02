import { validate, format } from './vat';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('de/vat', () => {
  it('format:DE 136,695 976', () => {
    const result = format('DE 136,695 976');

    expect(result).toEqual('136695976');
  });

  it('validate:DE136695976', () => {
    const result = validate('DE136695976');

    expect(result.isValid && result.compact).toEqual('136695976');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:136695978', () => {
    const result = validate('136695978');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

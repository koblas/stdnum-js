import { validate, format } from './dic';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('cz/dic', () => {
  it('format:CZ 25123891', () => {
    const result = format('CZ 25123891');

    expect(result).toEqual('25123891');
  });

  it('validate:CZ 25123891', () => {
    const result = validate('CZ 25123891');

    expect(result.isValid && result.compact).toEqual('25123891');
  });

  it('validate:1234567', () => {
    const result = validate('1234567');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:25123890', () => {
    const result = validate('25123890');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  // Special 9-digit case (DIČ starting with 6), see issue #164.
  // These are valid per the official EU VIES service but were falsely
  // rejected because checkSpecial diverged from python-stdnum.
  it('validate:CZ687836437', () => {
    const result = validate('CZ687836437');

    expect(result.isValid).toBe(true);
  });

  it('validate:640903926', () => {
    const result = validate('640903926');

    expect(result.isValid).toBe(true);
  });

  it('validate:681208919', () => {
    const result = validate('681208919');

    expect(result.isValid).toBe(true);
  });

  // VAT-group ID (format 699nnnnnk).
  it('validate:699005400', () => {
    const result = validate('699005400');

    expect(result.isValid).toBe(true);
  });

  // Wrong check digit on the special case must still be rejected.
  it('validate:687836438', () => {
    const result = validate('687836438');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  // Normal (non-special) 9-digit DIČ still delegates to rc and validates.
  it('validate:CZ991231123', () => {
    const result = validate('CZ991231123');

    expect(result.isValid && result.compact).toEqual('991231123');
  });
});

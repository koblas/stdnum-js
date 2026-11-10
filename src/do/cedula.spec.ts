import { validate, format } from './cedula';
import { InvalidLength, InvalidFormat, InvalidChecksum } from '../exceptions';
import { luhnChecksumValidate } from '../util/checksum';
import { CEDULA_WHITELIST } from './cedula-whitelist';

describe('do/cedula', () => {
  it('format:00113918205', () => {
    const result = format('00113918205');

    expect(result).toEqual('001-1391820-5');
  });

  it('validate:00113918205', () => {
    const result = validate('00113918205');

    expect(result.isValid && result.compact).toEqual('00113918205');
  });

  it('validate:0011391820Q', () => {
    const result = validate('0011391820Q');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it('validate:001139182', () => {
    const result = validate('001139182');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:00113918204', () => {
    const result = validate('00113918204');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  // The list holds real numbers, so they are not written out here.
  it('accepts every whitelisted number', () => {
    expect(CEDULA_WHITELIST.size).toBeGreaterThan(500);
    for (const value of CEDULA_WHITELIST) {
      expect(luhnChecksumValidate(value)).toBe(false);
      expect(validate(value).isValid).toBe(true);
    }
  });
});

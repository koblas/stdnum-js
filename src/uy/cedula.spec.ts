import { validate, format } from './cedula';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('uy/cedula', () => {
  it('format:11211234', () => {
    const result = format('11211234');

    expect(result).toEqual('1.121.123-4');
  });

  it('validate:12345672', () => {
    const result = validate('12345672');

    expect(result.isValid && result.compact).toEqual('12345672');
  });

  // The cédula is printed as a.bcd.efg-h, which is also what format() emits.
  it('validate:1.234.567-2', () => {
    const result = validate('1.234.567-2');

    expect(result.isValid && result.compact).toEqual('12345672');
  });

  it('validate:format:12345672', () => {
    const result = validate(format('12345672'));

    expect(result.isValid && result.compact).toEqual('12345672');
  });

  it('validate:1121123', () => {
    const result = validate('1121123');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:12345673', () => {
    const result = validate('12345673');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:1.234.567-3', () => {
    const result = validate('1.234.567-3');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

import { validate, format } from './nino';
import { InvalidLength, InvalidFormat } from '../exceptions';

describe('gb/nino', () => {
  it('format:HH 012345 D', () => {
    const result = format('HH 012345 D');

    expect(result).toEqual('HH012345D');
  });

  it('validate:HH012345D', () => {
    // A valid number with a suffix
    const result = validate('HH012345D');

    expect(result.isValid && result.compact).toEqual('HH012345D');
  });

  it('validate:hh012345d', () => {
    // A valid number with lowercase letters
    const result = validate('hh012345d');

    expect(result.isValid && result.compact).toEqual('HH012345D');
  });

  it('validate:HH012345', () => {
    // A valid number without a suffix
    const result = validate('HH012345');

    expect(result.isValid && result.compact).toEqual('HH012345');
  });

  it('validate:HH01234', () => {
    // Invalid length, too short
    const result = validate('HH01234');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:HH0123456D', () => {
    // Invalid length, too long
    const result = validate('HH0123456D');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:00012345D', () => {
    // Invalid numeric prefix, valid numbers, suffix
    const result = validate('00012345D');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it('validate:XO012345D', () => {
    // Invalid letter, valid numbers, suffix
    const result = validate('XO012345D');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it('validate:XO012345', () => {
    // Invalid letter, valid numbers, without suffix
    const result = validate('XO012345');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it('validate:HH01A345D', () => {
    // Valid prefix, invalid numeric section, with suffix
    const result = validate('HH01A345D');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it('validate:HH012345E', () => {
    // Valid prefix, valid numeric section, invalid suffix
    const result = validate('HH012345E');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});

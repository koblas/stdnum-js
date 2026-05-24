import { validate, format } from './nuit';
import { InvalidLength, InvalidFormat, InvalidChecksum } from '../exceptions';

describe('mz/nuit', () => {
  it('format:400012345', () => {
    const result = format('400012345');

    expect(result).toEqual('400 012 345');
  });

  it('format:40.001.234-5', () => {
    const result = format('40.001.234-5');

    expect(result).toEqual('400 012 345');
  });

  it('validate:107705694', () => {
    const result = validate('107705694');

    expect(result.isValid && result.compact).toEqual('107705694');
  });

  it('validate:40001234-2', () => {
    const result = validate('40001234-2');

    expect(result.isValid && result.compact).toEqual('400012342');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:1234567890', () => {
    const result = validate('1234567890');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:4000123A5', () => {
    const result = validate('4000123A5');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it('validate:00000000-0', () => {
    const result = validate('00000000-0');

    expect(result.isValid && result.compact).toEqual('000000000');
  });

  it('validate:40001234-5', () => {
    const result = validate('40001234-5');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

import { validate, format } from './insz';
import { InvalidLength, InvalidChecksum, InvalidFormat } from '../exceptions';

describe('be/insz', () => {
  it('format:88 02 29-999.90', () => {
    const result = format('88 02 29-999.90');

    expect(result).toEqual('88022999990');
  });

  it('validate:1', () => {
    const result = validate('1');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:88022999990', () => {
    // Valid only for NN, returns true
    const result = validate('88022999990');

    expect(result.isValid && result.compact).toEqual('88022999990');
  });

  it('validate:88222999936', () => {
    // Valid only for BIS, returns true
    const result = validate('88222999936');

    expect(result.isValid && result.compact).toEqual('88222999936');
  });

  it('validate:88150199951', () => {
    // Invalid Format for both
    const result = validate('88150199951');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it('validate:08222999935', () => {
    // Invalid format for NN (month + 20), Invalid checksum for BIS
    const result = validate('08222999935');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:20070199952', () => {
    // Invalid checksum for NN, Invalid format for BIS
    const result = validate('20070199952');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

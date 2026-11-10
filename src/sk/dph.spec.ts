import { validate, format } from './dph';
import { InvalidLength, InvalidChecksum, InvalidFormat } from '../exceptions';

describe('sk/dph', () => {
  it('format:SK 202 274 96 19', () => {
    const result = format('SK 202 274 96 19');

    expect(result).toEqual('202 274 96 19');
  });

  it('validate:SK 202 274 96 19', () => {
    const result = validate('SK 202 274 96 19');

    expect(result.isValid && result.compact).toEqual('2022749619');
  });

  // Third digit 2 is allowed even though the first digit is 1
  it('validate:1022749618', () => {
    const result = validate('1022749618');

    expect(result.isValid && result.compact).toEqual('1022749618');
  });

  // Third digit 0 is not allowed (divisible by 11)
  it('validate:2002749617', () => {
    const result = validate('2002749617');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  // First digit 0 is not allowed (divisible by 11)
  it('validate:0022749606', () => {
    const result = validate('0022749606');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:SK 202 274 96 18', () => {
    const result = validate('SK 202 274 96 18');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

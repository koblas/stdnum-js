import { validate, format } from './cbu';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('ar/cbu', () => {
  it('format:2850590940090418135201', () => {
    const result = format('2850590940090418135201');

    expect(result).toEqual('28505909 40090418135201');
  });

  it('validate:2850590940090418135201', () => {
    const result = validate('2850590940090418135201');

    expect(result.isValid && result.compact).toEqual('2850590940090418135201');
  });

  it('validate:281059094009041813520', () => {
    const result = validate('281059094009041813520');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:2810590940090418135201', () => {
    const result = validate('2810590940090418135201');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  // Regression: a check digit of 0 must be accepted. `10 - weightedSum(...)` yields
  // 10 (not 0) when the weighted sum is 0, so without the `% 10` wrap these valid
  // numbers were wrongly rejected as InvalidChecksum.
  it('validate:0720429088000002339140', () => {
    const result = validate('0720429088000002339140');

    expect(result.isValid && result.compact).toEqual('0720429088000002339140');
  });

  it('validate:0000000000000000000000', () => {
    const result = validate('0000000000000000000000');

    expect(result.isValid && result.compact).toEqual('0000000000000000000000');
  });

  it('validate:0720429088000002339141', () => {
    const result = validate('0720429088000002339141');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

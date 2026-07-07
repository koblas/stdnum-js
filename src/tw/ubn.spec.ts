import { validate, format } from './ubn';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('tw/ubn', () => {
  it('format:0050150 3', () => {
    const result = format('0050150 3');

    expect(result).toEqual('00501503');
  });

  it('validate:00501503', () => {
    const result = validate('00501503');

    expect(result.isValid && result.compact).toEqual('00501503');
  });

  // Old-rule numbers (weighted digit sum divisible by 10) stay valid.
  it('validate:04595257 (old rule, divisible by 10)', () => {
    const result = validate('04595257');

    expect(result.isValid && result.compact).toEqual('04595257');
  });

  // Since 2023-04-01 the weighted digit sum only needs to be divisible by 5.
  it('validate:00501508 (divisible by 5, new rule)', () => {
    const result = validate('00501508');

    expect(result.isValid && result.compact).toEqual('00501508');
  });

  // 7th digit is 7: product 7*4=28 sums to 10, so a remainder of 4 also passes.
  it('validate:00000074 (7th-digit special case, new rule)', () => {
    const result = validate('00000074');

    expect(result.isValid && result.compact).toEqual('00000074');
  });

  it('validate:12345', () => {
    const result = validate('12345');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:00501502', () => {
    const result = validate('00501502');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

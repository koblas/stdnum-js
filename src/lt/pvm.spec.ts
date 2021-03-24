import { validate, format } from './pvm';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('lt/pvm', () => {
  it('format:119511515', () => {
    const result = format('119511515');

    expect(result).toEqual('119511515');
  });

  it('validate:119511515', () => {
    const result = validate('119511515');

    expect(result.isValid && result.compact).toEqual('119511515');
  });

  it('validate:LT 100001919017', () => {
    const result = validate('LT 100001919017');

    expect(result.isValid && result.compact).toEqual('100001919017');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:100001919018', () => {
    const result = validate('100001919018');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

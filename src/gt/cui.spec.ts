import { validate, format } from './cui';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('gt/cui', () => {
  it('format:2415751810000', () => {
    const result = format('2415751810000');

    expect(result).toEqual('2415-75181-0000');
  });

  it('validate:1587564440904', () => {
    const result = validate('1587564440904');

    expect(result.isValid && result.compact).toEqual('1587564440904');
  });

  it('validate:1580352240101', () => {
    const result = validate('1580352240101');

    expect(result.isValid && result.compact).toEqual('1580352240101');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:1680352240101', () => {
    const result = validate('1680352240101');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

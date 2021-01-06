import { validate, format } from './utr';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('gb/utr', () => {
  it('format:1955839661', () => {
    const result = format('1955839661');

    expect(result).toEqual('1955839661');
  });

  it('validate:1955839661', () => {
    const result = validate('1955839661');

    expect(result.isValid && result.compact).toEqual('1955839661');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:2955839661', () => {
    const result = validate('2955839661');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

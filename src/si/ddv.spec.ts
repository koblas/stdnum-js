import { validate, format } from './ddv';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('si/ddv', () => {
  it('format:SI 5022 3054', () => {
    const result = format('SI 5022 3054');

    expect(result).toEqual('50223054');
  });

  it('validate:SI 5022 3054', () => {
    const result = validate('SI 5022 3054');

    expect(result.isValid && result.compact).toEqual('50223054');
  });

  it('validate:1234567', () => {
    const result = validate('1234567');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:SI 5022 3053', () => {
    const result = validate('SI 5022 3053');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

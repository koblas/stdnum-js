import { validate, format } from './vn';
import { InvalidLength, InvalidFormat } from '../exceptions';

describe('fo/vn', () => {
  it('format:623857', () => {
    const result = format('623857');

    expect(result).toEqual('623857');
  });

  it('fvalidate:623857', () => {
    const result = validate('623857');

    expect(result.isValid && result.compact).toEqual('623857');
  });

  test.each(['623857', '33 28 28', '563.609'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toEqual(true);
  });

  it('validate:62385', () => {
    const result = validate('62385');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:62385A', () => {
    const result = validate('62385A');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});

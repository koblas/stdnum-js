import { validate, format } from './nifp';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('gn/nifp', () => {
  it('format:693770885', () => {
    const result = format('693770885');

    expect(result).toEqual('693-770-885');
  });

  it('fvalidate:693-770-885', () => {
    const result = validate('693-770-885');

    expect(result.isValid && result.compact).toEqual('693770885');
  });

  test.each([
    '693770885',
    '693-770-885',
    '102193364',
    '330284803',
    '447777913',
  ])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toEqual(true);
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:693770884', () => {
    const result = validate('693770884');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

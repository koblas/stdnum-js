import { validate, format } from './tin';
import { InvalidLength, InvalidFormat } from '../exceptions';

describe('ge/tin', () => {
  it('format:123456789', () => {
    const result = format('123 456 789');

    expect(result).toEqual('123456789');
  });

  // 11 digits: personal number of a Georgian citizen
  it('validate:01234567890', () => {
    const result = validate('01234567890');

    expect(result.isValid && result.compact).toEqual('01234567890');
    expect(result.isValid && result.isCompany).toEqual(false);
  });

  // 9 digits: legal entity or foreign individual
  it('validate:212345678', () => {
    const result = validate('212345678');

    expect(result.isValid && result.compact).toEqual('212345678');
    expect(result.isValid && result.isCompany).toEqual(true);
  });

  test.each(['12345678', '1234567890', '123456789012'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.error).toBeInstanceOf(InvalidLength);
    },
  );

  it('validate:12345678A', () => {
    const result = validate('12345678A');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});

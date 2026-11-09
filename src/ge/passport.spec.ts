import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('ge/passport', () => {
  it('format:12345678', () => {
    const result = format('12345678');

    expect(result).toEqual('12345678');
  });

  test.each(['12345678', '123456789'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['AB123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['1234567', '1111111111', '1111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

describe('ge/passport other formats', () => {
  test.each(['12AB34567', '12345678'])('validate:%s', value => {
    expect(validate(value).isValid).toBeTruthy();
  });
});

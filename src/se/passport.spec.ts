import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('se/passport', () => {
  it('format:12345678', () => {
    const result = format('12345678');

    expect(result).toEqual('12345678');
  });

  test.each(['12345678', '00099912'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['AB123456', '111111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['1234567', '1111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

describe('se/passport real-world formats', () => {
  test.each(['XA0000001', '12345678'])('validate:%s', value => {
    expect(validate(value).isValid).toBeTruthy();
  });
});

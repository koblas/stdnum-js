import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('bs/passport', () => {
  it('format:C123456', () => {
    const result = format('C123456');

    expect(result).toEqual('C123456');
  });

  test.each(['C123456', 'PA1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['1123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['123456', 'CD12345678', '1111111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

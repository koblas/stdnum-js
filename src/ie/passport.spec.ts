import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('ie/passport', () => {
  it('format:PA1234567', () => {
    const result = format('PA1234567');

    expect(result).toEqual('PA1234567');
  });

  test.each(['PA1234567', 'XA9876543'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['PAA123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['1111111111', '11111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

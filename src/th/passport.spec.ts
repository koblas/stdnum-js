import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('th/passport', () => {
  it('format:AA1234567', () => {
    const result = format('AA1234567');

    expect(result).toEqual('AA1234567');
  });

  test.each(['AA1234567', 'AB0000001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['1A1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['AB123456', 'A1234567', '1111111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

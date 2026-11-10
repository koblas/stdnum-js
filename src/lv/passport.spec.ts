import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('lv/passport', () => {
  it('format:LZ1234567', () => {
    const result = format('LZ1234567');

    expect(result).toEqual('LZ1234567');
  });

  test.each(['LZ1234567', 'AB1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['ABC234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['LZ123456', '1111111111', '11111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

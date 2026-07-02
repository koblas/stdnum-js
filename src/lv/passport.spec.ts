import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('lv/passport', () => {
  it('format:LZ3263061', () => {
    const result = format('LZ3263061');

    expect(result).toEqual('LZ3263061');
  });

  test.each(['LZ3263061', 'AB1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['ABC234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['LZ326306', '1111111111', '11111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

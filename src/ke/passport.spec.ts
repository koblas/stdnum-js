import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('ke/passport', () => {
  it('format:A1234567', () => {
    const result = format('A1234567');

    expect(result).toEqual('A1234567');
  });

  test.each(['A1234567', 'AK123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['ABC1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['123456', '11111111111', '111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

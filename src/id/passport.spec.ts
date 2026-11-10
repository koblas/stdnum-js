import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('id/passport', () => {
  it('format:A123456', () => {
    const result = format('A123456');

    expect(result).toEqual('A123456');
  });

  test.each(['A123456', 'AB1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['12345678'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['ABC1234567', '1111111111', '111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

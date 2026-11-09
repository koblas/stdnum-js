import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('nz/passport', () => {
  it('format:LA123456', () => {
    const result = format('LA123456');

    expect(result).toEqual('LA123456');
  });

  test.each(['LA123456', 'EA123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['L1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['AB12345', '111111111', '1111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

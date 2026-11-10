import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('es/passport', () => {
  it('format:AB1234561', () => {
    const result = format('AB1234561');

    expect(result).toEqual('AB1234561');
  });

  test.each(['AB1234561', 'XY123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['AB1A34561'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['ABCD123456', 'A123456', '1111111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('dz/passport', () => {
  it('format:855609385', () => {
    const result = format('855609385');

    expect(result).toEqual('855609385');
  });

  test.each(['855609385', '197025599'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['AS0123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['AB123456', '1111111111', '11111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

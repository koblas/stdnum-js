import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('ar/passport', () => {
  it('format:AAB123456', () => {
    const result = format('AAB123456');

    expect(result).toEqual('AAB123456');
  });

  test.each(['AAB123456', 'XYZ000001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['AA1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['AAB12345', '1111111111', '11111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

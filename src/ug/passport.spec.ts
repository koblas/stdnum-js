import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('ug/passport', () => {
  it('format:B1234567', () => {
    const result = format('B1234567');

    expect(result).toEqual('B1234567');
  });

  test.each(['B1234567', 'DA123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['ABC123456', '12345678'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['1111111111', '1111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

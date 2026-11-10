import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('by/passport', () => {
  it('format:MP1234567', () => {
    const result = format('MP1234567');

    expect(result).toEqual('MP1234567');
  });

  test.each(['MP1234567', 'AB0000001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['M12345678'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['MP123456', '1111111111', '11111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

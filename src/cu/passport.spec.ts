import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('cu/passport', () => {
  it('format:C123456', () => {
    const result = format('C123456');

    expect(result).toEqual('C123456');
  });

  test.each(['C123456', 'A987654'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['1123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['AB123456', 'C12345', '11111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

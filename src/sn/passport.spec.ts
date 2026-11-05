import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('sn/passport', () => {
  it('format:123456789', () => {
    const result = format('123456789');

    expect(result).toEqual('123456789');
  });

  test.each(['123456789', '000000001'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['AB1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['12345', '1111111111', '11111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

describe('sn/passport real-world formats', () => {
  test.each(['A04447087', '123456789'])('validate:%s', value => {
    expect(validate(value).isValid).toBeTruthy();
  });
});

import { validate, format } from './passport';
import { InvalidLength } from '../exceptions';

describe('co/passport', () => {
  it('format:123456789', () => {
    const result = format('123456789');

    expect(result).toEqual('123456789');
  });

  test.each(['123456789'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['A12345', 'ABCDEFGHIJ', '1111111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

describe('co/passport real-world formats', () => {
  test.each(['PS123456', 'AB1234567'])('validate:%s', value => {
    expect(validate(value).isValid).toBeTruthy();
  });
});

import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('zm/passport', () => {
  it('format:ZN123456', () => {
    const result = format('ZN123456');

    expect(result).toEqual('ZN123456');
  });

  test.each(['ZN123456', 'ZP000045'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['Z1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['ZN12345', '111111111', '1111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

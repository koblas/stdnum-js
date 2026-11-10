import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('md/passport', () => {
  it('format:A1234567', () => {
    const result = format('A1234567');

    expect(result).toEqual('A1234567');
  });

  test.each(['A1234567', 'AB123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['ABCD1234', '123456789', '111111111', '1111111'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.error).toBeInstanceOf(InvalidFormat);
    },
  );

  test.each(['A1'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

describe('md/passport other formats', () => {
  test.each(['AB1234567', 'A1234567', 'AB123456'])('validate:%s', value => {
    expect(validate(value).isValid).toBeTruthy();
  });
});

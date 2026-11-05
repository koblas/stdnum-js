import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('ma/passport', () => {
  it('format:AB123456', () => {
    const result = format('AB123456');

    expect(result).toEqual('AB123456');
  });

  test.each(['AB123456', 'ZX987654'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['11111111', 'AB12345', '111111111', '1111111'])(
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

describe('ma/passport real-world formats', () => {
  test.each(['UZ6430184', 'AB123456'])('validate:%s', value => {
    expect(validate(value).isValid).toBeTruthy();
  });
});

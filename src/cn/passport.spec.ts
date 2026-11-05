import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('cn/passport', () => {
  it('format:EA1234567', () => {
    const result = format('EA1234567');

    expect(result).toEqual('EA1234567');
  });

  test.each(['EA1234567', 'G12345678'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toBeTruthy();
  });

  test.each(['EI1234567'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['1111111111', '11111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

describe('cn/passport real-world formats', () => {
  test.each(['PE3086952', 'EA1234567', 'E12345678', 'G12345678'])(
    'validate:%s',
    value => {
      expect(validate(value).isValid).toBeTruthy();
    },
  );
});

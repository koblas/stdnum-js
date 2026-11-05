import { validate, format } from './passport';
import { InvalidFormat, InvalidLength } from '../exceptions';

describe('tn/passport', () => {
  it('format:X1234567', () => {
    const result = format('X1234567');

    expect(result).toEqual('X1234567');
  });

  test.each(['X1234567', 'A0009999', 'Y777777', 'K989895'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.isValid).toBeTruthy();
    },
  );

  test.each(['AB123456', '1111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['X12345', '111111111'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

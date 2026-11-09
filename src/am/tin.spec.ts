import { validate, format } from './tin';
import { InvalidLength, InvalidFormat, InvalidChecksum } from '../exceptions';

describe('am/tin', () => {
  it('format:01234565', () => {
    const result = format('01234565');

    expect(result).toEqual('01234565');
  });

  // Made-up numbers with a valid check digit
  test.each(['01234565', '07654323', '00246806', '12345678', '0123 4565'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.isValid && result.compact).toEqual(
        value.replace(/[ -]/g, ''),
      );
    },
  );

  test.each(['1234567', '123456789'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:1234567A', () => {
    const result = validate('1234567A');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each([
    '01234566', // wrong check digit
    '00000017', // wrong check digit
    '01234530', // weighted sum is 0: never issued
    '01234590', // weighted sum is 10: never issued
  ])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

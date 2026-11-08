import { validate, format } from './tin';
import { InvalidLength, InvalidFormat } from '../exceptions';

describe('am/tin', () => {
  it('format:12345678', () => {
    const result = format('12345678');

    expect(result).toEqual('12345678');
  });

  test.each(['12345678', '00000017'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid && result.compact).toEqual(
      value.replace(/[ -]/g, ''),
    );
  });

  test.each(['1234567', '123456789'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:1234567A', () => {
    const result = validate('1234567A');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});

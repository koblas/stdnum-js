import { validate, format } from './tin';
import { InvalidLength, InvalidFormat } from '../exceptions';

describe('ck/tin', () => {
  it('format:12345', () => {
    const result = format('12345');

    expect(result).toEqual('12345');
  });

  test.each(['12345', '00042'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid && result.compact).toEqual(
      value.replace(/[ -]/g, ''),
    );
  });

  test.each(['1234', '123456'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:1234A', () => {
    const result = validate('1234A');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});

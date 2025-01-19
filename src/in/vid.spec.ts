import { validate, format } from './vid';
import { InvalidLength, InvalidFormat, InvalidChecksum } from '../exceptions';

describe('in/vid', () => {
  it('format:2341234123412342', () => {
    const result = format('2341234123412342');

    expect(result).toEqual('2341 2341 2341 2342');
  });

  test.each(['2341234123412341'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toEqual(true);
  });

  test.each(['13'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  test.each(['1341234123412341', '2222222222222222'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  test.each(['2341234123412342'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

import { validate, format } from './tax_code';
import { InvalidLength, InvalidFormat } from '../exceptions';

describe('tw/tax_code', () => {
  it('format:0050150 3', () => {
    const result = format('0050150 3');

    expect(result).toEqual('00501503');
  });

  test.each(['9000503', '2000 05 03 AA'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toEqual(true);
  });

  it('validate:9 00 05 15', () => {
    const result = validate('9 00 05 15');

    expect(result.isValid && result.compact).toEqual('9000515');
  });

  it('validate:12345', () => {
    const result = validate('12345');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:12345AA', () => {
    const result = validate('12345AA');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});

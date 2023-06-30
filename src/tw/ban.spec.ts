import { validate, format } from './ban';
import { InvalidLength, InvalidFormat } from '../exceptions';

describe('tw/ban', () => {
  it('format:0050150 3', () => {
    const result = format('0050150 3');

    expect(result).toEqual('00501503');
  });

  it('validate:00501503', () => {
    const result = validate('00501503');

    expect(result.isValid && result.compact).toEqual('00501503');
  });

  it('validate:12345', () => {
    const result = validate('12345');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:12345AAA', () => {
    const result = validate('12345AAA');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});

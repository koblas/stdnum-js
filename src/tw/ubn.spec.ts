import { validate, format } from './ubn';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('tw/ubn', () => {
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

  it('validate:00501502', () => {
    const result = validate('00501502');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

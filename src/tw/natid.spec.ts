import { validate, format } from './natid';
import { InvalidLength, InvalidComponent } from '../exceptions';

describe('tw/natid', () => {
  it('format:0050150 3', () => {
    const result = format('005-0150 3');

    expect(result).toEqual('00501503');
  });

  it('validate:A200501503', () => {
    const result = validate('A200501503');

    expect(result.isValid && result.compact).toEqual('A200501503');
  });

  it('validate:12345', () => {
    const result = validate('12345');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:12345AAAA', () => {
    const result = validate('12345AAA1A');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });
});

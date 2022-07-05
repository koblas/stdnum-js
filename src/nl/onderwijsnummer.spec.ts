import { validate, format } from './onderwijsnummer';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('nl/onderwijsnummer', () => {
  it('format:1012.22.331', () => {
    const result = format('1012.22.331');

    expect(result).toEqual('1012.22.331');
  });

  it('validate:1012.22.331', () => {
    const result = validate('1012.22.331');

    expect(result.isValid && result.compact).toEqual('101222331');
  });

  it('validate:1234567812', () => {
    const result = validate('12345678012');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:100252333', () => {
    const result = validate('100252333');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:1', () => {
    const result = validate('1');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

import { validate, format } from './fodselsnummer';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('no/fodselsnummer', () => {
  it('format:15108695088', () => {
    const result = format('15108695088');

    expect(result).toEqual('151086 95088');
  });

  it('validate:151086 95088', () => {
    const result = validate('151086 95088');

    expect(result.isValid && result.compact).toEqual('15108695088');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:15108695077', () => {
    const result = validate('15108695077');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

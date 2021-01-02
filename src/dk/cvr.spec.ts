import { validate, format } from './cvr';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('dk/cvr', () => {
  it('format:DK 13585628', () => {
    const result = format('DK 13585628');

    expect(result).toEqual('13585628');
  });

  it('validate:DK 13585628', () => {
    const result = validate('DK 13585628');

    expect(result.isValid && result.compact).toEqual('13585628');
  });

  it('validate:1234567', () => {
    const result = validate('1234567');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:DK 13585627', () => {
    const result = validate('DK 13585627');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

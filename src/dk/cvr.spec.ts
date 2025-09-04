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

  test.each(['DK13585628', '13585628', 'DK19319970'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toEqual(true);
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

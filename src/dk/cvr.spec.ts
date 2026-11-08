import { validate, format } from './cvr';
import { InvalidLength, InvalidChecksum, InvalidFormat } from '../exceptions';

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

  // No CVR number starts with 0. These all pass the modulus 11 check, so the
  // leading digit is the only thing that rejects them.
  test.each(['00000000', 'DK00000000', '01000004'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  // A registered CVR number still passes.
  test.each(['24256790', 'DK24256790'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid && result.compact).toEqual('24256790');
  });
});

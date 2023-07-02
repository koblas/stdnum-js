import { validate, format } from './nip';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('pl/nip', () => {
  it('format:PL 8567346215', () => {
    const result = format('PL 8567346215');

    expect(result).toEqual('8567346215');
  });

  it('validate:PL 8567346215', () => {
    const result = validate('PL 8567346215');

    expect(result.isValid && result.compact).toEqual('8567346215');
  });

  it('validate:0000002000', () => {
    const result = validate('0000002000');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:PL 8567346216', () => {
    const result = validate('PL 8567346216');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

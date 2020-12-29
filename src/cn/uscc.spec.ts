import { validate, format } from './uscc';
import { InvalidLength, InvalidChecksum, InvalidFormat } from '../exceptions';

describe('cn/uscc', () => {
  it('format:91110000600037341L', () => {
    const result = format('91110000600037341L');

    expect(result).toEqual('91110000600037341L');
  });

  it('validate:91110000600037341L', () => {
    const result = validate('91110000600037341L');

    expect(result.isValid && result.compact).toEqual('91110000600037341L');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:A1110000600037341L', () => {
    const result = validate('A1110000600037341L');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it('validate:91110000600037342L', () => {
    const result = validate('91110000600037342L');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

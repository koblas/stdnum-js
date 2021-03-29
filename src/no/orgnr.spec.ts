import { validate, format } from './orgnr';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('no/orgnr', () => {
  it('format:988077917', () => {
    const result = format('988077917');

    expect(result).toEqual('988 077 917');
  });

  it('validate:988 077 917', () => {
    const result = validate('988 077 917');

    expect(result.isValid && result.compact).toEqual('988077917');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:988 077 918', () => {
    const result = validate('988 077 918');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

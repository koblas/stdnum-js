import { validate, format } from './edrpou';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('ua/edrpou', () => {
  it('format:32855961', () => {
    const result = format('32855961');

    expect(result).toEqual('32855961');
  });

  it('validate:32855961', () => {
    const result = validate('32855961');

    expect(result.isValid && result.compact).toEqual('32855961');
  });

  it('validate:12345', () => {
    const result = validate('12345');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:32855968', () => {
    const result = validate('32855968');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

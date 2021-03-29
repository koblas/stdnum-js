import { validate, format } from './nif';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('pt/nif', () => {
  it('format:PT 501 964 843', () => {
    const result = format('PT 501 964 843');

    expect(result).toEqual('501 964 843');
  });

  it('validate:PT 501 964 843', () => {
    const result = validate('PT 501 964 843');

    expect(result.isValid && result.compact).toEqual('501964843');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:PT 501 964 842', () => {
    const result = validate('PT 501 964 842');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

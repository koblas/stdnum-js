import { validate, format } from './egn';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('bg/egn', () => {
  it('format:752316 926 3', () => {
    const result = format('752316 926 3');

    expect(result).toEqual('7523169263');
  });

  it('validate:8032056031', () => {
    const result = validate('8032056031');

    expect(result.isValid && result.compact).toEqual('8032056031');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:8032056032', () => {
    const result = validate('8032056032');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

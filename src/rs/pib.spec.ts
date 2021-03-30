import { validate, format } from './pib';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('rs/pib', () => {
  it('format:101134702', () => {
    const result = format('101134702');

    expect(result).toEqual('101134702');
  });

  it('validate:101134702', () => {
    const result = validate('101134702');

    expect(result.isValid && result.compact).toEqual('101134702');
  });

  it('validate:1234567890', () => {
    const result = validate('1234567890');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:101134701', () => {
    const result = validate('101134701');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

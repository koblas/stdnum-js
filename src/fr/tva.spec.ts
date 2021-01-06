import { validate, format } from './tva';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('fr/tva', () => {
  it('format:Fr 40 303 265045', () => {
    const result = format('Fr 40 303 265045');

    expect(result).toEqual('40 303 265 045');
  });

  it('validate:Fr 40 303 265 045', () => {
    const result = validate('Fr 40 303 265 045');

    expect(result.isValid && result.compact).toEqual('40303265045');
  });

  it('validate:23334175221', () => {
    const result = validate('23334175221');

    expect(result.isValid && result.compact).toEqual('23334175221');
  });

  it('validate:K7399859412', () => {
    const result = validate('K7399859412');

    expect(result.isValid && result.compact).toEqual('K7399859412');
  });

  it('validate:4Z123456782', () => {
    const result = validate('4Z123456782');

    expect(result.isValid && result.compact).toEqual('4Z123456782');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:84 323 140 391', () => {
    const result = validate('84 323 140 391');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

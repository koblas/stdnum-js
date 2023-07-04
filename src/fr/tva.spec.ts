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

  test.each([
    '40303265045',
    '23334175221',
    'K7399859412',
    '4Z123456782',
    'FR84323140392',
  ])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toEqual(true);
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

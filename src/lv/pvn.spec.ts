import { validate, format } from './pvn';
import {
  InvalidLength,
  InvalidChecksum,
  InvalidComponent,
} from '../exceptions';

describe('lv/pvn', () => {
  it('format:LV 4000 3521 600', () => {
    const result = format('LV 4000 3521 600');

    expect(result).toEqual('4000 3521 600');
  });

  it('validate:LV 4000 3521 600', () => {
    const result = validate('LV 4000 3521 600');

    expect(result.isValid && result.compact).toEqual('40003521600');
  });

  it('validate:161175-19997', () => {
    const result = validate('161175-19997');

    expect(result.isValid && result.compact).toEqual('16117519997');
  });

  it('validate:161375-19997', () => {
    const result = validate('161375-19997');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:40003521601', () => {
    const result = validate('40003521601');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  // Personal codes issued since 2017-07-01 start with 32 and have no birth date
  test.each(['32867300679', '32579461005'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid && result.isIndividual).toEqual(true);
  });

  it('validate:32867300678', () => {
    const result = validate('32867300678');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  // Other codes starting with 3 still need a valid birth date
  it('validate:33867300679', () => {
    const result = validate('33867300679');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });
});

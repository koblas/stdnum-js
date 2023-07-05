import { validate, format } from './ice';
import { InvalidLength, InvalidFormat } from '../exceptions';

describe('ma/ice', () => {
  it('format:0015 1257 2000078', () => {
    const result = format('0015 1257 2000078');

    expect(result).toEqual('001512572000078');
  });

  it('validate:00151257200007 8', () => {
    const result = validate('00151257200007 8');

    expect(result.isValid && result.compact).toEqual('001512572000078');
  });

  test.each([
    '001561191000066',
    '001512572000078',
    '002410367000010',
    '002614910000044',
  ])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toEqual(true);
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:MA0015125720000', () => {
    const result = validate('MA0015125720000');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});

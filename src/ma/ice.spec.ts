import { validate, format } from './ice';
import { InvalidLength, InvalidFormat } from '../exceptions';

describe('ma/ice', () => {
  it('format:0015 1257 2000078', () => {
    const result = format('0015 1257 2000078');

    expect(result).toEqual('001512572000078');
  });

  it('validate:001512572000078', () => {
    const result = validate('001512572000078');

    expect(result.isValid && result.compact).toEqual('001512572000078');
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

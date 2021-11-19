import { validate, format } from './ice9';
import { InvalidLength, InvalidFormat } from '../exceptions';

describe('ma/ice9', () => {
  it('format:001512572', () => {
    const result = format('001512572');

    expect(result).toEqual('001512572');
  });

  it('validate:001512572', () => {
    const result = validate('001512572');

    expect(result.isValid && result.compact).toEqual('001512572');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:MA0015125', () => {
    const result = validate('MA0015125');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});

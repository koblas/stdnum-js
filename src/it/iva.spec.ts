import { validate, format } from './iva';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('it/iva', () => {
  it('format:IT 00743110157', () => {
    const result = format('IT 00743110157');

    expect(result).toEqual('00743110157');
  });

  it('validate:IT 00743110157', () => {
    const result = validate('IT 00743110157');

    expect(result.isValid && result.compact).toEqual('00743110157');
  });

  it('validate:IT 0074311015', () => {
    const result = validate('IT 0074311015');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:IT 00743110158', () => {
    const result = validate('IT 00743110158');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

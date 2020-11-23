import { validate, format } from './cpj';
import { InvalidLength, InvalidComponent } from '../exceptions';

describe('cr/cpj', () => {
  it('format:4 000 042138', () => {
    const result = format('4 000 042138');

    expect(result).toEqual('4-000-042138');
  });

  it('validate:3-101-999999', () => {
    const result = validate('3-101-999999');

    expect(result.isValid && result.compact).toEqual('3101999999');
  });

  it('validate:310132541', () => {
    const result = validate('310132541');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:3-534-123559', () => {
    const result = validate('3-534-123559');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });
});

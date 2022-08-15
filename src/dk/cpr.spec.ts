import { InvalidComponent } from '../exceptions';
import { format, getBirthDate, validate } from './cpr';

describe('dk/cpr', () => {
  it('format:2110625629', () => {
    const result = format('2110625629');

    expect(result).toEqual('211062-5629');
  });

  it('getBirthDate("511062-0629")', () => {
    expect(() => {
      getBirthDate('511062-0629');
    }).toThrow(InvalidComponent);
  });

  it('getBirthDate("010180-1234")', () => {
    const result = validate('010180-1234');

    expect(result.isValid).toEqual(true);
  });

  it('validate wrong date', () => {
    const result = validate('511062-5629');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate future date', () => {
    const result = validate('2110525629');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });
});

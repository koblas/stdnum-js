import { InvalidComponent } from '../exceptions';
import { format, getBirthDate, validate } from './cpr';

describe('dk/cpr', () => {
  it('format:2110625629', () => {
    const result = format('2110625629');

    expect(result).toEqual('211062-5629');
  });

  it('getBirthDate("2110620629")', () => {
    expect(() => {
      getBirthDate('2110620629');
    }).toThrow(InvalidComponent);
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

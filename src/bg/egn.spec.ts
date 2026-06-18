import { validate, format } from './egn';
import {
  InvalidLength,
  InvalidChecksum,
  InvalidComponent,
} from '../exceptions';

describe('bg/egn', () => {
  it('format:752316 926 3', () => {
    const result = format('752316 926 3');

    expect(result).toEqual('7523169263');
  });

  it('validate:8032056031', () => {
    const result = validate('8032056031');

    expect(result.isValid && result.compact).toEqual('8032056031');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:8032056032', () => {
    const result = validate('8032056032');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  // The first six digits are a birth date whose month encodes the century
  // (41-52 -> 2000s, 21-32 -> 1800s); an impossible date must be rejected even
  // when the check digit is correct.
  it('validate:2992070971 (impossible month, valid check digit)', () => {
    const result = validate('2992070971');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:8019010008 (impossible month)', () => {
    const result = validate('8019010008');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });
});

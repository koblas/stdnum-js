import { validate, format } from './idnr';
import {
  InvalidLength,
  InvalidChecksum,
  InvalidComponent,
} from '../exceptions';

describe('de/idnr', () => {
  it('format:36574261809', () => {
    const result = format('36574261809');

    expect(result).toEqual('36 574 261 809');
  });

  test.each(['36574261809'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid && result.compact).toEqual(value);
  });

  it('validate:36 574 261 809', () => {
    const result = validate('36 574 261 809');

    expect(result.isValid && result.compact).toEqual('36574261809');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:36574261808', () => {
    const result = validate('36574261808');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  // Exactly one digit must repeat, two or three times, in the first 10 digits
  test.each(['12345678903', '11112345678'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });
});

import { validate, format } from './vnr';
import {
  InvalidLength,
  InvalidChecksum,
  InvalidComponent,
} from '../exceptions';

describe('at/vnr', () => {
  it('format:1237010180', () => {
    const result = format('1237010180');

    expect(result).toEqual('1237 010180');
  });

  it('validate:1237 010180', () => {
    const result = validate('1237 010180');

    expect(result.isValid && result.compact).toEqual('1237010180');
  });

  it('validate:2237 010180', () => {
    const result = validate('2237 010180');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:1237 01018', () => {
    const result = validate('1237 01018');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:1237 410180', () => {
    const result = validate('1237 410180');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });
});

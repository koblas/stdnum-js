import { validate, format } from './sin';
import {
  InvalidLength,
  InvalidChecksum,
  InvalidFormat,
  InvalidComponent,
} from '../exceptions';

describe('ca/sin', () => {
  it('format:123456782', () => {
    const result = format('123456782');

    expect(result).toEqual('123-456-782');
  });

  it('validate:123-456-782', () => {
    const result = validate('123-456-782');

    expect(result.isValid && result.compact).toEqual('123456782');
  });

  it('validate:12345678Z', () => {
    const result = validate('12345678Z');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:999-999-999', () => {
    const result = validate('999-999-999');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:823456785', () => {
    const result = validate('823456785');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:023456783', () => {
    const result = validate('023456783');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });
});

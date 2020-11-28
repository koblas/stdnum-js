import { validate, format } from './rif';
import {
  InvalidLength,
  InvalidComponent,
  InvalidChecksum,
} from '../exceptions';

describe('ve/rif', () => {
  it('format:V114702834', () => {
    const result = format('V114702834');

    expect(result).toEqual('V-11470283-4');
  });

  it('validate:V-11470283-4', () => {
    const result = validate('V-11470283-4');

    expect(result.isValid && result.compact).toEqual('V114702834');
  });

  it('validate:O-11470283-3', () => {
    const result = validate('O-11470283-3');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:V-11470283-3', () => {
    const result = validate('V-11470283-3');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

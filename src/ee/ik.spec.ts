import { validate, format } from './ik';
import {
  InvalidLength,
  InvalidChecksum,
  InvalidComponent,
} from '../exceptions';

describe('ee/ik', () => {
  it('format:36805280109', () => {
    const result = format('36805280109');

    expect(result).toEqual('36805280109');
  });

  it('validate:36805280109', () => {
    const result = validate('36805280109');

    expect(result.isValid && result.compact).toEqual('36805280109');
  });

  // Valid check digit, but first digit 0 is not a valid century
  it('validate:06805280106', () => {
    const result = validate('06805280106');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:36813280103', () => {
    const result = validate('36813280103');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:36805280108', () => {
    const result = validate('36805280108');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

import { validate, format } from './ik';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('ee/ik', () => {
  it('format:36805280109', () => {
    const result = format('36805280109');

    expect(result).toEqual('36805280109');
  });

  it('validate:36805280109', () => {
    const result = validate('36805280109');

    expect(result.isValid && result.compact).toEqual('36805280109');
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

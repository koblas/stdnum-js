import { validate, format } from './gstin';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('in/gstin', () => {
  it('format:27AAPFU0939F1ZV', () => {
    const result = format('27AAPFU0939F1ZV');

    expect(result).toEqual('27AAPFU0939F1ZV');
  });

  it('fvalidate:27AAPFU0939F1ZV', () => {
    const result = validate('27AAPFU0939F1ZV');

    expect(result.isValid && result.compact).toEqual('27AAPFU0939F1ZV');
  });

  test.each(['27AAPFU0939F1ZV', '29AAGCB7383J1Z4'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toEqual(true);
  });

  it('validate:27AAPFU0939F1Z', () => {
    const result = validate('27AAPFU0939F1Z');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:27AAPFU0939F1Z0', () => {
    const result = validate('27AAPFU0939F1Z0');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

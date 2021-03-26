import { validate, format } from './vat';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('mt/vat', () => {
  it('format:MT 1167-9112', () => {
    const result = format('MT 1167-9112');

    expect(result).toEqual('1167-9112');
  });

  it('validate:MT 1167-9112', () => {
    const result = validate('MT 1167-9112');

    expect(result.isValid && result.compact).toEqual('11679112');
  });

  it('validate:123456789', () => {
    const result = validate('123456789');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:MT 1167-9113', () => {
    const result = validate('MT 1167-9113');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

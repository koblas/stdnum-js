import { validate, format } from './anum';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('hu/anum', () => {
  it('format:HU-12892312', () => {
    const result = format('HU-12892312');

    expect(result).toEqual('12892312');
  });

  it('validate:HU-12892312', () => {
    const result = validate('HU-12892312');

    expect(result.isValid && result.compact).toEqual('12892312');
  });

  it('validate:1234567', () => {
    const result = validate('1234567');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:HU-12892313', () => {
    const result = validate('HU-12892313');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

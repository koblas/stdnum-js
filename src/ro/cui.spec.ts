import { validate, format } from './cui';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('ro/cui', () => {
  it('format:18547290', () => {
    const result = format('18547290');

    expect(result).toEqual('185 472 90');
  });

  it('validate:185 472 90', () => {
    const result = validate('185 472 90');

    expect(result.isValid && result.compact).toEqual('18547290');
  });

  it('validate:123456789012', () => {
    const result = validate('123456789012');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:185 472 91', () => {
    const result = validate('185 472 91');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

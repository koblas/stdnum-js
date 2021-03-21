import { validate, format } from './vsk';
import { InvalidLength } from '../exceptions';

describe('is/vsk', () => {
  it('format:IS 00621', () => {
    const result = format('IS 00621');

    expect(result).toEqual('00621');
  });

  it('validate:IS 00621', () => {
    const result = validate('IS 00621');

    expect(result.isValid && result.compact).toEqual('00621');
  });

  it('validate:IS 0062199', () => {
    const result = validate('IS 0062199');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

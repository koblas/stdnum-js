import { validate, format } from './pin';
import { InvalidLength } from '../exceptions';

describe('az/pin', () => {
  it('format:123 123 3', () => {
    const result = format('123 123 3');

    expect(result).toEqual('1231233');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

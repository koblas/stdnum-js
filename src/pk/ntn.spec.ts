import { validate, format } from './ntn';
import { InvalidLength } from '../exceptions';

describe('pk/ntn', () => {
  it('format:1234567', () => {
    const result = format('1234567');

    expect(result).toEqual('1234567');
  });

  it('validate:1234567', () => {
    const result = validate('1234567');

    expect(result.isValid && result.compact).toEqual('1234567');
  });

  it('validate:123456', () => {
    const result = validate('123456');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

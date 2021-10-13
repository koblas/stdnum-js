import { validate, format } from './ice';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('ma/ice', () => {
  it('format:0015 1257 2000078', () => {
    const result = format('0015 1257 2000078');

    expect(result).toEqual('001512572000078');
  });

  it('validate:001512572000078', () => {
    const result = validate('001512572000078');

    expect(result.isValid && result.compact).toEqual('001512572000078');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:732829320000753', () => {
    const result = validate('732829320000753');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

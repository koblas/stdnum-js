import { validate, format } from './cui';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('pe/cui', () => {
  it('format:101174102', () => {
    const result = format('101174102');

    expect(result).toEqual('10117410-2');
  });

  it('validate:10117410-2', () => {
    const result = validate('10117410-2');

    expect(result.isValid && result.compact).toEqual('101174102');
  });

  it('validate:1011741', () => {
    const result = validate('1011741');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:10117410-3', () => {
    const result = validate('10117410-3');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

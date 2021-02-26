import { validate, format } from './ce';
import { InvalidLength } from '../exceptions';

describe('pe/cui', () => {
  it('format:001766062', () => {
    const result = format('001766062');

    expect(result).toEqual('001766062');
  });

  it('validate:001766062', () => {
    const result = validate('001766062');

    expect(result.isValid && result.compact).toEqual('001766062');
  });

  it('validate:001043328', () => {
    const result = validate('001043328');

    expect(result.isValid && result.compact).toEqual('001043328');
  });

  it('validate:001112311', () => {
    const result = validate('001112311');

    expect(result.isValid && result.compact).toEqual('001112311');
  });

  it('validate:000056828', () => {
    const result = validate('000056828');

    expect(result.isValid && result.compact).toEqual('000056828');
  });

  it('validate:000494998', () => {
    const result = validate('000494998');

    expect(result.isValid && result.compact).toEqual('000494998');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

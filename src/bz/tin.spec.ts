import { validate, format } from './tin';
import { InvalidLength, InvalidComponent } from '../exceptions';

describe('bz/tin', () => {
  it('format:00000510', () => {
    const result = format('00000510');

    expect(result).toEqual('000005-10');
  });

  it('validate:00000510', () => {
    const result = validate('00000510');

    expect(result.isValid && result.compact).toEqual('00000510');
  });

  it('validate:0000051', () => {
    const result = validate('0000051');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:00000520', () => {
    const result = validate('00000520');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });
});

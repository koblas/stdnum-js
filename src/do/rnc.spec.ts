import { validate, format } from './rnc';
import { InvalidLength, InvalidChecksum, InvalidFormat } from '../exceptions';

describe('do/rnc', () => {
  it('format:101850043', () => {
    const result = format('101850043');

    expect(result).toEqual('1-01-85004-3');
  });

  it('validate:1-01-85004-3', () => {
    const result = validate('1-01-85004-3');

    expect(result.isValid && result.compact).toEqual('101850043');
  });

  it('validate:401505967', () => {
    const result = validate('401505967');

    expect(result.isValid && result.compact).toEqual('401505967');
  });

  it('validate:1018A0043', () => {
    const result = validate('1018A0043');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it('validate:10185004', () => {
    const result = validate('10185004');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:101850042', () => {
    const result = validate('101850042');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

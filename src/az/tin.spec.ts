import { validate, format, compact } from './tin';
import { InvalidLength, InvalidFormat, InvalidChecksum } from '../exceptions';

describe('az/tin', () => {
  it('format:123-123-126-1', () => {
    const result = format('123-123-126-1');

    expect(result).toEqual('1231231261');
  });

  it('validate:234567872', () => {
    const result = validate('234567872');

    expect(result.isValid && result.compact).toEqual('0234567872');
  });

  it('compact:234567872', () => {
    expect(compact('234567872')).toEqual('0234567872');
  });

  it('validate:1231231261', () => {
    const result = validate('1231231261');

    expect(result.isValid && result.compact).toEqual('1231231261');
    expect(result.isValid && result.isCompany).toEqual(true);
  });

  it('validate:0234567872', () => {
    const result = validate('0234567872');

    expect(result.isValid && result.isIndividual).toEqual(true);
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:1231231263', () => {
    const result = validate('1231231263');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it('validate:ZZ00057421', () => {
    const result = validate('ZZ00057421');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it('validate:1231231231', () => {
    const result = validate('1231231231');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

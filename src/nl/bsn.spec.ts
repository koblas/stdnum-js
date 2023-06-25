import { validate, format } from './bsn';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('nl/bsn', () => {
  it('format:111222333', () => {
    const result = format('111222333');

    expect(result).toEqual('1112.22.333');
  });

  test.each([
    '001855013', // RSIN
    '1112.22.333', // BSN
  ])('isValid', value => {
    const result = validate(value);

    expect(result.isValid).toEqual(true);
  });

  it('validate:1112.22.333', () => {
    const result = validate('1112.22.333');

    expect(result.isValid && result.compact).toEqual('111222333');
  });

  it('validate:002455799', () => {
    const result = validate('002455799');

    // expect(result.isValid && result.compact).toEqual('002455799');
    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:12345678912', () => {
    const result = validate('12345678912');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:1112.52.333', () => {
    const result = validate('1112.52.333');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:123456782', () => {
    const result = validate('123456782');

    expect(result.isValid && result.compact).toEqual('123456782');
  });

  it('validate:40645678', () => {
    const result = validate('40645678');

    expect(result.isValid && result.compact).toEqual('40645678');
  });

  it('validate:1', () => {
    const result = validate('1');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:1234567', () => {
    const result = validate('1234567');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

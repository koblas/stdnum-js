import { validate, format } from './bsn';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('nl/bsn', () => {
  it('format:111222333', () => {
    const result = format('111222333');

    expect(result).toEqual('1112.22.333');
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

  it('validate:1', () => {
    const result = validate('1');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

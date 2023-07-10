import { validate, format } from './aadhaar';
import { InvalidLength, InvalidChecksum, InvalidFormat } from '../exceptions';

describe('in/aadhaar', () => {
  it('format:234123412346', () => {
    const result = format('234123412346');

    expect(result).toEqual('2341 2341 2346');
  });

  it('validate:234123412346', () => {
    const result = validate('234123412346');

    expect(result.isValid && result.compact).toEqual('234123412346');
  });

  it('validate:123412341234', () => {
    const result = validate('123412341234');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it('validate:222222222222', () => {
    const result = validate('222222222222');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:234123412347', () => {
    const result = validate('234123412347');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

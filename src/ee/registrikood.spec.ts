import { validate, format } from './registrikood';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('ee/registrikood', () => {
  it('format:12345678', () => {
    const result = format('12345678');

    expect(result).toEqual('12345678');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.isValid && result.compact).toEqual('12345678');
  });

  it('validate:1234567899', () => {
    const result = validate('1234567899');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:12345679', () => {
    const result = validate('12345679');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

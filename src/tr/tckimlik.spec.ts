import { validate, format } from './tckimlik';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('tr/tckimlik', () => {
  it('format:17291716060', () => {
    const result = format('17291716060');

    expect(result).toEqual('17291716060');
  });

  it('validate:17291716060', () => {
    const result = validate('17291716060');

    expect(result.isValid && result.compact).toEqual('17291716060');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:17291716050', () => {
    const result = validate('17291716050');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

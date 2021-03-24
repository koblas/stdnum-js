import { validate, format } from './asmens';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('lt/asmens', () => {
  it('format:33309240064', () => {
    const result = format('33309240064');

    expect(result).toEqual('33309240064');
  });

  it('validate:33309240064', () => {
    const result = validate('33309240064');

    expect(result.isValid && result.compact).toEqual('33309240064');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:33309240164', () => {
    const result = validate('33309240164');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

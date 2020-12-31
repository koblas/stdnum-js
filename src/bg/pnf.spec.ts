import { validate, format } from './pnf';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('bg/pnf', () => {
  it('format:7111 042 925', () => {
    const result = format('7111 042 925');

    expect(result).toEqual('7111042925');
  });

  it('validate:7111 042 925', () => {
    const result = validate('7111 042 925');

    expect(result.isValid && result.compact).toEqual('7111042925');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:7111 042 926', () => {
    const result = validate('7111 042 926');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

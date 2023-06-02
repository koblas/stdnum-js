import { validate, format } from './nir';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('fr/nir', () => {
  it('format:295109912611193', () => {
    const result = format('295109912611193');

    expect(result).toEqual('2 95 10 99 126 111 93');
  });

  test.each(['186022A21532523', '2 95 10 99 126 111 93'])(
    'validate-list:%s',
    value => {
      const result = validate(value);
      expect(result.isValid).toEqual(true);
    },
  );

  it('validate:2 95 10 99 126 111 93', () => {
    const result = validate('2 95 10 99 126 111 93');

    expect(result.isValid && result.compact).toEqual('295109912611193');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:295109912611199', () => {
    const result = validate('295109912611199');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

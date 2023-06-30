import { validate, format } from './nipt';
import { InvalidLength, InvalidFormat } from '../exceptions';

describe('al/nibt', () => {
  it('format:AL J 91402501 L', () => {
    const result = format('AL J 91402501 L');

    expect(result).toEqual('J91402501L');
  });

  test.each(['I05101999Q', 'K52224002A', 'L42307014K'])(
    'validate:%s',
    value => {
      const result = validate(value);

      expect(result.isValid).toEqual(true);
    },
  );

  it('validate:AL J 91402501 L', () => {
    const result = validate('AL J 91402501 L');

    expect(result.isValid && result.compact).toEqual('J91402501L');
  });

  it('validate:(AL) J 91402501L', () => {
    const result = validate('(AL) J 91402501L');

    expect(result.isValid && result.compact).toEqual('J91402501L');
  });

  it('validate:(AL) J 91402501', () => {
    const result = validate('(AL) J 91402501');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:Z 22218003 V', () => {
    const result = validate('Z 22218003 V');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});

import { validate, format } from './{{tincode}}';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('{{country}}/{{tincode}}', () => {
  it('format:VALUE', () => {
    const result = format('VALUE');

    expect(result).toEqual('VALUE');
  });

  it('fvalidate:VALUE', () => {
    const result = validate('VALUE');

    expect(result.isValid && result.compact).toEqual('VALUE');
  });

  test.each(['VALUE1', 'VALUE2'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toEqual(true);
  });

  it('validate:VALUE', () => {
    const result = validate('VALUE');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:VALUE', () => {
    const result = validate('VALUE');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

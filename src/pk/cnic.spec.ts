import { validate, format } from './cnic';
import { InvalidComponent, InvalidLength } from '../exceptions';

describe('pk/cnic', () => {
  it('format:5410498905786', () => {
    const result = format('5410498905786');

    expect(result).toEqual('54104-9890578-6');
  });

  test.each(['54104-9890578-6', '34201-0891231-8'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toEqual(true);
  });

  it('validate_compact:54104-9890578-6', () => {
    const result = validate('54104-9890578-6');

    expect(result.isValid && result.compact).toEqual('5410498905786');
  });

  test.each(['34201-0891231-0', '94201-0891231-8'])('validate:%s', value => {
    const result = validate(value);

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:54104-9890578', () => {
    const result = validate('54104-9890578');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

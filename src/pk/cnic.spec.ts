import { validate, format } from './cnic';
import { InvalidLength, InvalidComponent } from '../exceptions';

describe('pk/cnic', () => {
  it('format:5410498905786', () => {
    const result = format('5410498905786');

    expect(result).toEqual('54104-9890578-6');
  });

  it('validate:54104-9890578-6', () => {
    const result = validate('54104-9890578-6');

    expect(result.isValid && result.compact).toEqual('5410498905786');
  });

  it('validate:54104-9890578', () => {
    const result = validate('54104-9890578');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:54104-9890578-0', () => {
    const result = validate('54104-9890578-0');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });
});

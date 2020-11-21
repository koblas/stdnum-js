import { validate, format } from './cpf';
import { InvalidLength, InvalidChecksum, InvalidFormat } from '../exceptions';

describe('br/cpf', () => {
  it('format:23100299900', () => {
    const result = format('23100299900');

    expect(result).toEqual('231.002.999-00');
  });

  it('validate:390.533.447-05', () => {
    const result = validate('390.533.447-05');

    expect(result.isValid && result.compact).toEqual('39053344705');
  });

  it('validate:660-3', () => {
    const result = validate('660-3');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:231.002.999-00', () => {
    const result = validate('231.002.999-00');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:390.533.447=0', () => {
    const result = validate('390.533.447=0');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});

import { validate, format } from './cnpj';
import { InvalidLength, InvalidChecksum, InvalidFormat } from '../exceptions';

describe('br/cnpj', () => {
  it('format:16727230000197', () => {
    const result = format('16727230000197');

    expect(result).toEqual('16.727.230/0001-97');
  });

  it('validate:16.727.230/0001-97', () => {
    const result = validate('16.727.230/0001-97');

    expect(result.isValid && result.compact).toEqual('16727230000197');
  });

  it('validate:660-3', () => {
    const result = validate('660-3');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:16.727.230.0001-98', () => {
    const result = validate('16.727.230.0001-98');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:16.727.230/0001=9', () => {
    const result = validate('16.727.230/0001=9');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});

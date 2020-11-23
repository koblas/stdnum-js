import { validate, format } from './cpf';
import { InvalidLength, InvalidComponent } from '../exceptions';

describe('cr/cpf', () => {
  it('format:701610395', () => {
    const result = format('701610395');

    expect(result).toEqual('07-0161-0395');
  });

  it('format:1-613-584', () => {
    const result = format('1-613-584');

    expect(result).toEqual('01-0613-0584');
  });

  it('validate:3-0455-0175', () => {
    const result = validate('3-0455-0175');

    expect(result.isValid && result.compact).toEqual('0304550175');
  });

  it('validate:30-1234-1234', () => {
    const result = validate('30-1234-1234');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

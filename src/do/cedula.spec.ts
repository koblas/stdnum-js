import { validate, format } from './cedula';
import { InvalidLength, InvalidFormat, InvalidChecksum } from '../exceptions';

describe('do/cedula', () => {
  it('format:00113918205', () => {
    const result = format('00113918205');

    expect(result).toEqual('001-1391820-5');
  });

  it('validate:00113918205', () => {
    const result = validate('00113918205');

    expect(result.isValid && result.compact).toEqual('00113918205');
  });

  it('validate:0011391820Q', () => {
    const result = validate('0011391820Q');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it('validate:001139182', () => {
    const result = validate('001139182');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:00113918204', () => {
    const result = validate('00113918204');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

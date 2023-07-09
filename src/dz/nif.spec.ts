import { validate, format } from './nif';
import { InvalidLength, InvalidFormat } from '../exceptions';

describe('dz/nif', () => {
  it('format:000 216 001 808 337 13010', () => {
    const result = format('000 216 001 808 337 13010');

    expect(result).toEqual('00021600180833713010');
  });

  it('fvalidate:000 216 001 808 337 13010', () => {
    const result = validate('000 216 001 808 337 13010');

    expect(result.isValid && result.compact).toEqual('00021600180833713010');
  });

  test.each([
    '416001000000007',
    '408 020 000 150 039',
    '41201600000606600001',
    '000 216 001 808 337 13010',
  ])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toEqual(true);
  });

  it('validate:X1600100000000V', () => {
    const result = validate('X1600100000000V');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it('validate:41600100000000', () => {
    const result = validate('41600100000000');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

import { validate, format } from './edb';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('mk/edb', () => {
  it('format:МК 4020990116747', () => {
    const result = format('МК 4020990116747');

    expect(result).toEqual('4020990116747');
  });

  it('format:MK4057009501106', () => {
    const result = format('MK4057009501106');

    expect(result).toEqual('4057009501106');
  });

  it('fvalidate:MK4030000375897', () => {
    const result = validate('MK4030000375897');

    expect(result.isValid && result.compact).toEqual('4030000375897');
  });

  test.each([
    'МК 4020990116747',
    'MK4057009501106',
    '4057018541765',
    '4057019547848',
    '4061018502090',
    '4064012500591',
    '4065015500653',
    '4069011500670',
    '4071016500495',
  ])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toEqual(true);
  });

  it('validate:405701954784', () => {
    const result = validate('405701954784');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:4057019547840', () => {
    const result = validate('4057019547840');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

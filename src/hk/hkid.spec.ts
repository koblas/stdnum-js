import { validate, format } from './hkid';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('hk/hkid', () => {
  it('format:AB987654(3)', () => {
    const result = format('AB9876543');

    expect(result).toEqual('AB9876543');
  });

  it('validate:G123456A', () => {
    const result = validate('G123456A');

    expect(result.isValid && result.compact).toEqual('G123456A');
  });

  it('validate:A5555550', () => {
    const result = validate('A5555550');

    expect(result.isValid && result.compact).toEqual('A5555550');
  });

  it('validate:C5678909', () => {
    const result = validate('C5678909');

    expect(result.isValid && result.compact).toEqual('C5678909');
  });

  it('validate:AB9876543', () => {
    const result = validate('AB9876543');

    expect(result.isValid && result.compact).toEqual('AB9876543');
  });

  it('validate:WX1234569', () => {
    const result = validate('WX1234569');

    expect(result.isValid && result.compact).toEqual('WX1234569');
  });

  it('validate:12345678', () => {
    const result = validate('1234567');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:C5678908', () => {
    const result = validate('C5678908');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

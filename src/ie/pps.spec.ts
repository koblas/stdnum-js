import { validate, format } from './pps';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('ie/pps', () => {
  it('format:6433435F', () => {
    const result = format('6433435F');

    expect(result).toEqual('6433435F');
  });

  it('validate:6433435F', () => {
    const result = validate('6433435F');

    expect(result.isValid && result.compact).toEqual('6433435F');
  });

  it('validate:6433435FT', () => {
    const result = validate('6433435FT');

    expect(result.isValid && result.compact).toEqual('6433435FT');
  });

  it('validate:6433435FW', () => {
    const result = validate('6433435FW');

    expect(result.isValid && result.compact).toEqual('6433435FW');
  });

  it('validate:6433435OA', () => {
    const result = validate('6433435OA');

    expect(result.isValid && result.compact).toEqual('6433435OA');
  });

  it('validate:6433435IH', () => {
    const result = validate('6433435IH');

    expect(result.isValid && result.compact).toEqual('6433435IH');
  });

  it('validate:12345678', () => {
    const result = validate('1234567891');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:6433435VH', () => {
    const result = validate('6433435VH');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:6433435E', () => {
    const result = validate('6433435VH');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

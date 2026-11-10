import { validate, format } from './ncf';
import { InvalidLength, InvalidComponent } from '../exceptions';

describe('do/ncf', () => {
  it('format:E31 000000 0005', () => {
    const result = format('E31 000000 0005');

    expect(result).toEqual('E310000000005');
  });

  it('validate:E310000000005', () => {
    const result = validate('E310000000005');

    expect(result.isValid && result.compact).toEqual('E310000000005');
  });

  it('validate:B0100000005', () => {
    const result = validate('B0100000005');

    expect(result.isValid && result.compact).toEqual('B0100000005');
  });

  it('validate:Z0100000005', () => {
    const result = validate('Z0100000005');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:A020010210100000005', () => {
    const result = validate('A020010210100000005');

    expect(result.isValid && result.compact).toEqual('A020010210100000005');
  });

  it('validate:P020010210100000005', () => {
    const result = validate('P020010210100000005');

    expect(result.isValid && result.compact).toEqual('P020010210100000005');
  });

  it('validate:AP20010210100000005', () => {
    const result = validate('AP20010210100000005');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:A010010019900000004', () => {
    const result = validate('A010010019900000004');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:Z0100', () => {
    const result = validate('Z0100');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

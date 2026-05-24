import { validate, format } from './bi';
import { InvalidLength, InvalidFormat } from '../exceptions';

describe('mz/bi', () => {
  it('format:110504162779A', () => {
    const result = format('110504162779A');

    expect(result).toEqual('110504162779A');
  });

  it('format:1105 0416 2779A', () => {
    const result = format('1105 0416 2779A');

    expect(result).toEqual('110504162779A');
  });

  it('validate:110504162779A', () => {
    const result = validate('110504162779A');

    expect(result.isValid && result.compact).toEqual('110504162779A');
  });

  it('validate:100101028277A', () => {
    const result = validate('100101028277A');

    expect(result.isValid && result.compact).toEqual('100101028277A');
  });

  it('validate:100104675207I', () => {
    const result = validate('100104675207I');

    expect(result.isValid && result.compact).toEqual('100104675207I');
  });

  it('validate:100106727603C', () => {
    const result = validate('100106727603C');

    expect(result.isValid && result.compact).toEqual('100106727603C');
  });

  it('validate:100104946669B', () => {
    const result = validate('100104946669B');

    expect(result.isValid && result.compact).toEqual('100104946669B');
  });

  it('validate:110102526188J', () => {
    const result = validate('110102526188J');

    expect(result.isValid && result.compact).toEqual('110102526188J');
  });

  it('validate:1105 0416 2779A', () => {
    const result = validate('1105 0416 2779A');

    expect(result.isValid && result.compact).toEqual('110504162779A');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:12345678901234', () => {
    const result = validate('12345678901234');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:1234567890123', () => {
    const result = validate('1234567890123');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});

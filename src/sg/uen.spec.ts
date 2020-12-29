import { validate, format } from './uen';
import { InvalidLength } from '../exceptions';

describe('sg/uen', () => {
  it('format:T01FC6132D', () => {
    const result = format('T01FC6132D');

    expect(result).toEqual('T01FC6132D');
  });

  it('validate:00192200M', () => {
    const result = validate('00192200M');

    expect(result.isValid && result.compact).toEqual('00192200M');
  });

  it('validate:197401143C', () => {
    const result = validate('197401143C');

    expect(result.isValid && result.compact).toEqual('197401143C');
  });

  it('validate:S16FC0121D', () => {
    const result = validate('S16FC0121D');

    expect(result.isValid && result.compact).toEqual('S16FC0121D');
  });

  it('validate:T01FC6132D', () => {
    const result = validate('T01FC6132D');

    expect(result.isValid && result.compact).toEqual('T01FC6132D');
  });

  it('validate:123456', () => {
    const result = validate('123456');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  // it('validate:2449/494/16/0', () => {
  //   const result = validate('2449/494/16/0');

  //   expect(result.error).toBeInstanceOf(InvalidChecksum);
  // });
});

import { validate, format } from './cnp';
import {
  InvalidLength,
  InvalidChecksum,
  InvalidComponent,
} from '../exceptions';

describe('ro/cnp', () => {
  it('format:1630615123457', () => {
    const result = format('1630615123457');

    expect(result).toEqual('1630615123457');
  });

  it('validate:1630615123457', () => {
    const result = validate('1630615123457');

    expect(result.isValid && result.compact).toEqual('1630615123457');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:1630615123458', () => {
    const result = validate('1630615123458');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:0800101221142', () => {
    const result = validate('0800101221142');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:0800101228842', () => {
    const result = validate('0800101228842');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:1632215123457', () => {
    const result = validate('1632215123457');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:5240512700014', () => {
    const result = validate('5240512700014');

    expect(result.isValid && result.compact).toEqual('5240512700014');
  });

  it('validate:5240512700013', () => {
    const result = validate('5240512700013');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:5240512830010', () => {
    const result = validate('5240512830010');

    expect(result.isValid && result.compact).toEqual('5240512830010');
  });

  it('validate:1630615993454', () => {
    const result = validate('1630615993454');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });
});

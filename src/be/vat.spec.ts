import { validate, format } from './vat';
import {
  InvalidLength,
  InvalidChecksum,
  InvalidComponent,
} from '../exceptions';

describe('be/vat', () => {
  it('format:403019261', () => {
    const result = format('403019261');

    expect(result).toEqual('0403019261');
  });

  it('validate:BE403019261', () => {
    const result = validate('BE403019261');

    expect(result.isValid && result.compact).toEqual('0403019261');
  });

  it('validate:(0)403019261', () => {
    const result = validate('(0)403019261');

    expect(result.isValid && result.compact).toEqual('0403019261');
  });

  it('validate:BE 428759497', () => {
    const result = validate('BE 428759497');

    expect(result.isValid && result.compact).toEqual('0428759497');
  });

  it('validate:BE 0417497106', () => {
    const result = validate('BE 0417497106');

    expect(result.isValid && result.compact).toEqual('0417497106');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:BE431150351', () => {
    const result = validate('BE431150351');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:1000002197', () => {
    const result = validate('1000002197');

    expect(result.isValid && result.compact).toEqual('1000002197');
  });

  it('validate:1000002100', () => {
    const result = validate('1000002100');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:1000002001', () => {
    const result = validate('1000002001');

    expect(result.isValid && result.compact).toEqual('1000002001');
  });

  it('validate:1000002098', () => {
    const result = validate('1000002098');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:BE 1000000021', () => {
    const result = validate('BE 1000000021');

    expect(result.isValid && result.compact).toEqual('1000000021');
  });

  it('validate:BE2000021323', () => {
    const result = validate('BE2000021323');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });
});

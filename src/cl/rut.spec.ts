import { validate, format } from './rut';
import {
  InvalidLength,
  InvalidChecksum,
  InvalidComponent,
} from '../exceptions';

describe('cl/rut', () => {
  it('format:800280610', () => {
    const result = format('125319092');

    expect(result).toEqual('12.531.909-2');
  });

  it('validate:76086428-5', () => {
    const result = validate('76086428-5');

    expect(result.isValid && result.compact).toEqual('760864285');
  });

  it('validate:CL 12531909-2', () => {
    const result = validate('CL 12531909-2');

    expect(result.isValid && result.compact).toEqual('125319092');
  });

  it('validate:12531909-3', () => {
    const result = validate('12531909-3');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:76086A28-5', () => {
    const result = validate('76086A28-5');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:76628-5', () => {
    const result = validate('76628-5');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:2660-4', () => {
    const result = validate('2660-4');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

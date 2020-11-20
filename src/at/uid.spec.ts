import { validate, format } from './uid';
import {
  InvalidLength,
  InvalidChecksum,
  InvalidComponent,
} from '../exceptions';

describe('at/uid', () => {
  it('format:AT U13585627', () => {
    const result = format('AT U13585627');

    expect(result).toEqual('U13585627');
  });

  it('validate:AT U13585627', () => {
    const result = validate('AT U13585627');

    expect(result.isValid && result.compact).toEqual('U13585627');
  });

  it('validate:U13585627', () => {
    const result = validate('U13585627');

    expect(result.isValid && result.compact).toEqual('U13585627');
  });

  it('validate:X13585626', () => {
    const result = validate('X13585626');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:U1358562', () => {
    const result = validate('U1358562');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:U13585626', () => {
    const result = validate('U13585626');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

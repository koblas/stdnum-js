import { validate, format } from './rc';
import {
  InvalidLength,
  InvalidChecksum,
  InvalidComponent,
} from '../exceptions';

describe('cz/rc', () => {
  it('format:7103192745', () => {
    const result = format('7103192745');

    expect(result).toEqual('710319/2745');
  });

  it('validate:710319/2745', () => {
    const result = validate('710319/2745');

    expect(result.isValid && result.compact).toEqual('7103192745');
  });

  it('validate:991231123', () => {
    const result = validate('991231123');

    expect(result.isValid && result.compact).toEqual('991231123');
  });

  it('validate:1103492745', () => {
    const result = validate('1103492745');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:590312/12', () => {
    const result = validate('590312/12');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:7103192746', () => {
    const result = validate('7103192746');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

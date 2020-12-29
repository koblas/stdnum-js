import { validate, format } from './brn';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('kr/brn', () => {
  it('format:1168200276', () => {
    const result = format('1168200276');

    expect(result).toEqual('116-82-00276');
  });

  it('validate:116-82-00276', () => {
    const result = validate('116-82-00276');

    expect(result.isValid && result.compact).toEqual('1168200276');
  });

  it('validate:123456789', () => {
    const result = validate('123456789');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:116-82-00278', () => {
    const result = validate('116-82-00278');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

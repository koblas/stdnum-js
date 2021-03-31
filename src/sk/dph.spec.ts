import { validate, format } from './dph';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('sk/dph', () => {
  it('format:SK 202 274 96 19', () => {
    const result = format('SK 202 274 96 19');

    expect(result).toEqual('202 274 96 19');
  });

  it('validate:SK 202 274 96 19', () => {
    const result = validate('SK 202 274 96 19');

    expect(result.isValid && result.compact).toEqual('2022749619');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:SK 202 274 96 18', () => {
    const result = validate('SK 202 274 96 18');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

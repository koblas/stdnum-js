import { validate, format } from './tin';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('za/tin', () => {
  it('format:2449/494-16-0', () => {
    const result = format('2449/494-16-0');

    expect(result).toEqual('2449494160');
  });

  it('validate:0001339050', () => {
    const result = validate('0001339050');

    expect(result.isValid && result.compact).toEqual('0001339050');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:2449/494/16/0', () => {
    const result = validate('2449/494/16/0');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

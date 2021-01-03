import { validate, format } from './kmkr';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('ee/kmkr', () => {
  it('format:EE 100 931 558', () => {
    const result = format('EE 100 931 558');

    expect(result).toEqual('100931558');
  });

  it('validate:100594102', () => {
    const result = validate('100594102');

    expect(result.isValid && result.compact).toEqual('100594102');
  });

  it('validate:1234567', () => {
    const result = validate('1234567');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:100594103', () => {
    const result = validate('100594103');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

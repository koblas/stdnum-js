import { validate, format } from './oib';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('hr/oib', () => {
  it('format:HR 33392005961', () => {
    const result = format('HR 33392005961');

    expect(result).toEqual('33392005961');
  });

  it('validate:HR 33392005961', () => {
    const result = validate('HR 33392005961');

    expect(result.isValid && result.compact).toEqual('33392005961');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:33392005962', () => {
    const result = validate('33392005962');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

import { validate, format } from './jmbg';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('ba/jmbg', () => {
  it('format:0101006500006', () => {
    const result = format('0101006500006');

    expect(result).toEqual('0101006500006');
  });

  it('validate:0101006500006', () => {
    const result = validate('0101006500006');

    expect(result.isValid && result.compact).toEqual('0101006500006');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:0101006500007', () => {
    const result = validate('0101006500007');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

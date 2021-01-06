import { validate, format } from './hetu';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('fi/hetu', () => {
  it('format:131052-308T', () => {
    const result = format('131052-308T');

    expect(result).toEqual('131052-308T');
  });

  it('validate:131052-308T', () => {
    const result = validate('131052-308T');

    expect(result.isValid && result.compact).toEqual('131052-308T');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:131052-308U', () => {
    const result = validate('131052-308U');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

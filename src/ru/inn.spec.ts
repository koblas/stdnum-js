import { validate } from './inn';
import { InvalidChecksum } from '../exceptions';

describe('ru/inn', () => {
  it('validate:123456789047', () => {
    const result = validate('123456789047');

    expect(result.isValid && result.compact).toEqual('123456789047');
  });

  it('validate:1234567894', () => {
    const result = validate('1234567894');

    expect(result.isValid && result.compact).toEqual('1234567894');
  });

  it('validate:366220664163', () => {
    const result = validate('366220664163');

    expect(result.isValid && result.compact).toEqual('366220664163');
  });

  it('validate:123456789037', () => {
    const result = validate('123456789037');
    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('format:1234567895', () => {
    const result = validate('1234567895');
    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

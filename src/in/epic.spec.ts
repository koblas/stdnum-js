import { validate, format } from './epic';
import { InvalidLength, InvalidChecksum } from '../exceptions';

describe('in/epic', () => {
  it('format:WKH1186253', () => {
    const result = format('WKH1186253');

    expect(result).toEqual('WKH1186253');
  });

  it('fvalidate:WKH1186253', () => {
    const result = validate('WKH1186253');

    expect(result.isValid && result.compact).toEqual('WKH1186253');
  });

  test.each(['WKH1186253'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toEqual(true);
  });

  it('validate:WKH118625', () => {
    const result = validate('WKH118625');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:WKH1186254', () => {
    const result = validate('WKH1186254');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

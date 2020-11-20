import { validate, format } from './dni';
import { InvalidLength } from '../exceptions';

describe('ar/dni', () => {
  it('format:20123456', () => {
    const result = format('20123456');

    expect(result).toEqual('20.123.456');
  });

  it('validate:20.123.456', () => {
    const result = validate('20.123.456');

    expect(result.isValid && result.compact).toEqual('20123456');
  });

  it('validate:2012345699', () => {
    const result = validate('2012345699');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });
});

import { validate, format } from './pin';
import { InvalidLength, InvalidFormat } from '../exceptions';

describe('ke/pin', () => {
  it('format:P051365947M', () => {
    const result = format('P051365947M');

    expect(result).toEqual('P051365947M');
  });

  it('fvalidate:P051365947M', () => {
    const result = validate('P051365947M');

    expect(result.isValid && result.compact).toEqual('P051365947M');
  });

  test.each(['P051365947M', 'P051365947M'])('validate:%s', value => {
    const result = validate(value);

    expect(result.isValid).toEqual(true);
  });

  it('validate:P051365947', () => {
    const result = validate('P051365947');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:P05136594M7', () => {
    const result = validate('P05136594M7');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});

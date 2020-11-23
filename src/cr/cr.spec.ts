import { validate, format } from './cr';
import { InvalidLength, InvalidComponent } from '../exceptions';

describe('cr/cr', () => {
  it('format:122200569906', () => {
    const result = format('122200569906');

    expect(result).toEqual('122200569906');
  });

  it('validate:155812994816', () => {
    const result = validate('155812994816');

    expect(result.isValid && result.compact).toEqual('155812994816');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:300123456789', () => {
    const result = validate('300123456789');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });
});

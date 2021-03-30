import { validate, format } from './onrc';
import { InvalidComponent } from '../exceptions';

describe('ro/onrc', () => {
  it('format:J52/750/2012', () => {
    const result = format('J52/750/2012');

    expect(result).toEqual('J52/750/2012');
  });

  it('validate:J52/750/2012', () => {
    const result = validate('J52/750/2012');

    expect(result.isValid && result.compact).toEqual('J52/750/2012');
  });

  it('validate:J52/750/03.07.2012', () => {
    const result = validate('J52/750/03.07.2012');

    expect(result.isValid && result.compact).toEqual('J52/750/2012');
  });

  it('validate:X52/750/2012', () => {
    const result = validate('X52/750/2012');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });
});

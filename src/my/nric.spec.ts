import { validate, format } from './nric';
import { InvalidLength, InvalidComponent } from '../exceptions';

describe('my/nric', () => {
  it('format:770305021234', () => {
    const result = format('770305021234');

    expect(result).toEqual('770305-02-1234');
  });

  it('validate:770305-02-1234', () => {
    const result = validate('770305-02-1234');

    expect(result.isValid && result.compact).toEqual('770305021234');
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:770305-17-1234', () => {
    const result = validate('771305-17-1234');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:771305-02-1234', () => {
    const result = validate('771305-02-1234');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  // it('validate:2449/494/16/0', () => {
  //   const result = validate('2449/494/16/0');

  //   expect(result.error).toBeInstanceOf(InvalidChecksum);
  // });
});

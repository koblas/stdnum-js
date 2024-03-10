import { validate, format } from './nic';
import { InvalidLength, InvalidFormat } from '../exceptions';

describe('lk/nic', () => {
  it('format:199439848733', () => {
    const result = format('199439848733');

    expect(result).toEqual('199439848733');
  });

  it('validate:199439848733', () => {
    const result = validate('199439848733');

    expect(result.isValid && result.compact).toEqual('199439848733');
  });

  it('validate:942281632v', () => {
    const result = validate('942281632v');

    expect(result.isValid && result.compact).toEqual('942281632V');
  });

  it('validate:942R81632b', () => {
    const result = validate('942281632b');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it('validate:942R81632b', () => {
    const result = validate('942R81632b');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it('validate:23417', () => {
    const result = validate('23417');
    expect(result.error).toBeInstanceOf(InvalidLength);
  });

});

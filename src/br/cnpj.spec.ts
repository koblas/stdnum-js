import { validate, format } from './cnpj';
import { InvalidLength, InvalidChecksum, InvalidFormat } from '../exceptions';

describe('br/cnpj', () => {
  it('format:16727230000197', () => {
    const result = format('16727230000197');

    expect(result).toEqual('16.727.230/0001-97');
  });

  it('validate:16.727.230/0001-97', () => {
    const result = validate('16.727.230/0001-97');

    expect(result.isValid && result.compact).toEqual('16727230000197');
  });

  it('validate:660-3', () => {
    const result = validate('660-3');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:16.727.230.0001-98', () => {
    const result = validate('16.727.230.0001-98');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:16.727.230/0001=9', () => {
    const result = validate('16.727.230/0001=9');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it('format:12ABC34501DE35 (alphanumeric)', () => {
    const result = format('12ABC34501DE35');

    expect(result).toEqual('12.ABC.345/01DE-35');
  });

  it('validate:12.ABC.345/01DE-35 (alphanumeric)', () => {
    const result = validate('12.ABC.345/01DE-35');

    expect(result.isValid && result.compact).toEqual('12ABC34501DE35');
  });

  it('validate:12abc34501de35 (alphanumeric lowercase)', () => {
    const result = validate('12abc34501de35');

    expect(result.isValid && result.compact).toEqual('12ABC34501DE35');
  });

  it('validate:12.ABC.345/01DE-99 (alphanumeric bad checksum)', () => {
    const result = validate('12.ABC.345/01DE-99');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:12.ABC.345/01DE-AB (non-numeric check digits)', () => {
    const result = validate('12.ABC.345/01DE-AB');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });
});

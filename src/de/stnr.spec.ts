import { validate, format } from './stnr';
import { InvalidComponent, InvalidFormat, InvalidLength } from '../exceptions';

describe('de/stnr', () => {
  it('format:18181508155', () => {
    const result = format('18181508155');

    expect(result).toEqual('181/815/0815 5');
  });

  it('validate:10863924976', () => {
    const result = validate('10863924976');

    expect(result.isValid && result.compact).toEqual('10863924976');
  });

  it('validate:36574261809', () => {
    const result = validate('36574261809');

    expect(result.isValid && result.compact).toEqual('36574261809');
  });

  it('validate:136695978', () => {
    const result = validate('136695978');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:121/5752/5373', () => {
    const result = validate('121/5752/5373');

    expect(result.isValid && result.compact).toEqual('12157525373');
  });

  it('validate:14/203/31601', () => {
    const result = validate('14/203/31601');

    expect(result.isValid && result.compact).toEqual('1420331601');
  });

  // it('validate:36574261808', () => {
  //   const result = validate('36574261808');

  //   expect(result.error).toBeInstanceOf(InvalidChecksum);
  // });

  it('validate:1234567890', () => {
    const result = validate('1234567890');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:0472480661811', () => {
    const result = validate('0472480661811');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  // Test coverage from
  //  https://de.wikipedia.org/wiki/Steuernummer
  //  -- Turns out these are not valid numbers

  // test.each([
  //   '93815/08152',
  //   '181/815/08155',
  //   '21/815/08150',
  //   '48/815/08155',
  //   '75 815 08152',
  //   '02/815/08156',
  //   '013 815 08153',
  //   '79/815/08151',
  //   '24/815/08151',
  //   '133/8150/8159',
  //   '22/815/08154',
  //   '10/815/08182',
  //   '201/123/12340',
  //   '101/815/08154',
  //   '29/815/08158	',
  //   '151/815/08156',
  // ])('stnr(%s)', num => {
  //   const result = validate(num);

  //   expect(result.isValid).toEqual(true);
  // });
});

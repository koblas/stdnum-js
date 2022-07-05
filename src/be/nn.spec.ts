import { validate, format } from './nn';
import { InvalidLength, InvalidChecksum, InvalidFormat } from '../exceptions';

describe('be/nn', () => {
  it('format:88 02 29-999.90', () => {
    const result = format('88 02 29-999.90');

    expect(result).toEqual('88022999990');
  });

  it('format:88022999990', () => {
    const result = format('88022999990');

    expect(result).toEqual('88022999990');
  });

  it('validate:1', () => {
    const result = validate('1');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:88022999990', () => {
    const result = validate('88022999990');

    expect(result.isValid && result.compact).toEqual('88022999990');
  });

  it('validate:88022999991', () => {
    const result = validate('88022999991');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:87022999991', () => {
    const result = validate('87022999991');

    expect(result.error).toBeInstanceOf(InvalidFormat);
  });

  it('validate:88022999297', () => {
    const result = validate('88022999297');

    expect(result.isValid && result.compact).toEqual('88022999297')
  });

  it('validate:85073003328', () => {
    const result = validate('85073003328');

    expect(result.isValid && result.compact).toEqual('85073003328');
  });

  it('validate:20070199922', () => {
    const result = validate('20070199922');

    expect(result.isValid && result.compact).toEqual('20070199922');
  });

  it('validate:20070199951', () => {
    const result = validate('20070199951');

    expect(result.isValid && result.compact).toEqual('20070199951');
  });

  it('validate:20070199952', () => {
    const result = validate('20070199952');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:80000099902', () => {
    const result = validate('80000099902');

    expect(result.isValid && result.compact).toEqual('80000099902');
  });

  it('validate:80000099903', () => {
    const result = validate('80000099903');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:00000199939', () => {
    const result = validate('00000199939');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:00000199938', () => {
    const result = validate('00000199938');

    expect(result.isValid && result.compact).toEqual('00000199938');
  });

  it('validate:99000099913', () => {
    const result = validate('99000099913');

    expect(result.isValid && result.compact).toEqual('99000099913');
  });

  it('validate:99000099942', () => {
    const result = validate('99000099942');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });

  it('validate:(unspecified date in current year)', () => {
    const yy = new Date().getFullYear() % 100;
    const baseNum = parseInt(`${yy}0000999`, 10);
    const twoPrefixedBaseNumber = parseInt(`${2}${baseNum}`, 10)
    const checksum = 97 - (twoPrefixedBaseNumber % 97);
    const id = `${baseNum}${checksum}`;

    const result = validate(id);
    expect(result.isValid && result.compact).toEqual(id);
  });

  it('validate:(unspecified date 100 years ago)', () => {
    const yy = new Date().getFullYear() % 100;
    const baseNum = parseInt(`${yy}0000999`, 10);
    const checksum = 97 - (baseNum % 97);
    const id = `${baseNum}${checksum}`;

    const result = validate(id);
    expect(result.isValid && result.compact).toEqual(id);
  });
});

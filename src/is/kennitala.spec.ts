import { validate, format } from './kennitala';
import {
  InvalidLength,
  InvalidChecksum,
  InvalidComponent,
} from '../exceptions';

describe('is/kennitala', () => {
  it('format:4504013150', () => {
    const result = format('4504013150');

    expect(result).toEqual('450401-3150');
  });

  it('validate:450401-3150', () => {
    const result = validate('450401-3150');

    expect(result.isValid && result.compact).toEqual('4504013150');
    expect(result.isValid && result.isCompany).toEqual(true);
  });

  it('validate:120174-3399', () => {
    const result = validate('120174-3399');

    expect(result.isValid && result.compact).toEqual('1201743399');
    expect(result.isValid && result.isIndividual).toEqual(true);
  });

  it('validate:320174-3399', () => {
    const result = validate('320174-3399');

    expect(result.error).toBeInstanceOf(InvalidComponent);
  });

  it('validate:12345678', () => {
    const result = validate('12345678');

    expect(result.error).toBeInstanceOf(InvalidLength);
  });

  it('validate:530575-0299', () => {
    const result = validate('530575-0299');

    expect(result.error).toBeInstanceOf(InvalidChecksum);
  });
});

import { validate, format } from './rfc';

describe('mx/rfc', () => {
  it('validate:GODE 561231 GR8', () => {
    const result = validate('GODE 561231 GR8');

    expect(result.isValid && result.compact).toEqual('GODE561231GR8');
  });

  it('validate:MAB-930714-8T4', () => {
    const result = validate('MAB-930714-8T4');

    expect(result.isValid && result.compact).toEqual('MAB9307148T4');
  });

  it('validate:COMG-600703', () => {
    const result = validate('COMG-600703');

    expect(result.isValid && result.compact).toEqual('COMG600703');
  });

  it('validate:VACE-460910-SX6', () => {
    const result = validate('VACE-460910-SX6');

    expect(result.isValid).toEqual(false);
  });

  it('format:GODE561231GR8', () => {
    const result = format('GODE561231GR8');

    expect(result).toEqual('GODE 561231 GR8');
  });
});

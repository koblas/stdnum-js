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

  it('validate:MHTR93041179A', () => {
    const result = validate('MHTR93041179A');

    expect(result.isValid && result.compact).toEqual('MHTR93041179A');
  });

  it('validate:Ñ&T130705MD6', () => {
    const result = validate('Ñ&T130705MD6');

    expect(result.isValid && result.compact).toEqual('Ñ&T130705MD6');
  });

  it('validate:  mhtr-93041179a  ', () => {
    const result = validate('  mhtr-93041179a  ');

    expect(result.isValid && result.compact).toEqual('MHTR93041179A');
  });

  it('validate:SALC7304253S0', () => {
    const result = validate('SALC7304253S0');

    expect(result.isValid && result.compact).toEqual('SALC7304253S0');
  });

  // it('validate:XEXX010101000', () => {
  //   const result = validate('XEXX010101000');

  //   expect(result.isValid && result.compact).toEqual('XEXX010101000');
  // });

  it('validate:RET130705MD5', () => {
    const result = validate('RET130705MD5');

    expect(result.isValid && result.compact).toEqual('RET130705MD5');
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

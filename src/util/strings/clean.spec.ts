import { cleanUnicode } from './clean';

describe('clean', () => {
  it('basic', () => {
    expect(cleanUnicode('123', '2')[0]).toEqual('13');
  });

  it('unicode-9', () => {
    expect(cleanUnicode('\u{1D7FF}9')[0]).toEqual('99');
  });

  it('simple whitespace', () => {
    expect(cleanUnicode('8\t\xA08')[0]).toEqual('88');
  });
});

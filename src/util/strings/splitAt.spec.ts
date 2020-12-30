import { splitAt } from './splitAt';

describe('splitAt', () => {
  it('basic', () => {
    expect(splitAt('abcdefghij', 3, 6)).toEqual(['abc', 'def', 'ghij']);
  });

  it('negative', () => {
    expect(splitAt('abcdefghij', -6, -3)).toEqual(['abcd', 'efg', 'hij']);
  });

  it('short', () => {
    expect(splitAt('abc', 3)).toEqual(['abc']);
  });
});

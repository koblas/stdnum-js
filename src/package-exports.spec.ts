import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// `stdnum/<country>` needs its own exports entry: the "./*" pattern maps
// `stdnum/gb` to lib/cjs/gb.js, and exports patterns never fall back to
// index.js. Every country re-exported from src/index.ts must have one.

const root = join(__dirname, '..');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as {
  exports: Record<string, unknown>;
};
const index = readFileSync(join(root, 'src', 'index.ts'), 'utf8');
const countries = [
  ...index.matchAll(/import \* as \w+ from '\.\/([a-z]+)'/g),
].map(m => m[1]);

describe('package.json exports', () => {
  it('finds the countries in src/index.ts', () => {
    expect(countries.length).toBeGreaterThan(90);
  });

  it.each(countries)('has an entry for stdnum/%s', dir => {
    expect(pkg.exports[`./${dir}`]).toEqual({
      types: `./lib/esm/${dir}/index.d.ts`,
      node: `./lib/cjs/${dir}/index.js`,
      import: `./lib/esm/${dir}/index.js`,
      default: `./lib/cjs/${dir}/index.js`,
    });
  });
});

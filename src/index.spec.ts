import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import * as lib from './index';

// Every country module imported by index.ts must be reachable both as a
// named export and through the `stdnum` object (AI was once missing from it).

const source = readFileSync(join(__dirname, 'index.ts'), 'utf8');
const imported = [
  ...source.matchAll(/import \* as (\w+) from '\.\/[a-z]+'/g),
].map(m => m[1]);
const named = lib as unknown as Record<string, unknown>;

describe('index exports', () => {
  it('finds the country imports', () => {
    expect(imported.length).toBeGreaterThan(90);
  });

  it('lists the same countries in the stdnum object', () => {
    expect(Object.keys(lib.stdnum).sort()).toEqual([...imported].sort());
  });

  it.each(imported)('exports %s by name and in stdnum', code => {
    expect(named[code]).toBeDefined();
    expect(lib.stdnum[code]).toBe(named[code]);
  });

  it('validates an Anguilla TIN through stdnum.AI', () => {
    // Valid per src/ai/tin.spec.ts.
    expect(lib.stdnum.AI.tin.validate('12345-67890').isValid).toBe(true);
  });
});

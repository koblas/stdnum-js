/// <reference types="vitest" />
import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

function pathFromCurrent(path: string): string {
  return resolve(__dirname, path);
}

export default defineConfig({
  test: {
    globals: true,
    setupFiles: [pathFromCurrent('src/tests/setupUnitTests.ts')],
  },
});

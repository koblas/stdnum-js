import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // The specs use describe/it/expect without importing them.
    globals: true,
    include: ['src/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.spec.ts'],
    },
  },
});

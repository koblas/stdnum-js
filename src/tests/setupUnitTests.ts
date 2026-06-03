import { afterAll } from 'vitest';

afterAll(async () => {
  if (global.gc) {
    global.gc();
  }
});

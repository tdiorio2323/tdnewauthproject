/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: true,
    jsxRuntime: 'automatic',
    setupFiles: ['tests/setup.ts'],
    coverage: {
      reporter: ['text', 'json-summary', 'lcov'],
      lines: 50,
      functions: 50,
      branches: 40,
      statements: 50,
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['**/*.d.ts', 'src/vite-env.d.ts'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

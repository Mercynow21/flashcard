import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {defineConfig as defineVitestConfig} from 'vitest/config';

const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: 'jsdom',
  }
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/flashcard/',
  test: vitestConfig.test
})


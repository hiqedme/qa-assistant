/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      // '/openmrs': {
      //   target: 'https://dev3.openmrs.org/',
      //   changeOrigin: true,
      //   secure: false,
      // },

      '/api': {
        // target: 'http://Admins-MacBook-Pro.local:3012',
        target: 'http://127.0.0.1:3012',
        changeOrigin: true,
        secure: false,
      },
      '/amrs': {
        target: 'https://ngx.ampath.or.ke/',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
  },
});

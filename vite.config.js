import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/products': {
        target: 'http://localhost:8000',
        changeOrigin: true,

        rewrite: (path) => path.replace(/^\/products/, '/products'), // Исправлено
      },
      '/account': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/account/, '/account'), // Исправлено
      },
      '/basket': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/basket/, '/basket'), // Исправлено
      },
    },
  },
});

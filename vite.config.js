import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/products': {
        target: 'https://koreacenter.kg/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/products/, '/products'), // Исправлено для использования '/products'
      },
      '/account': {
        target: 'https://koreacenter.kg/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/account/, '/account'), // Исправлено
      },
      '/api': {
        target: 'https://koreacenter.kg/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'), // Исправлено
      },
    },
  },
});

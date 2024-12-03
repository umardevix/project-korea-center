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
        rewrite: (path) => path.replace(/^\/products/, '/products'),
      },
      '/account': {
        target: 'https://koreacenter.kg/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/account/, '/account'),
      },
      '/api': {
        target: 'https://koreacenter.kg/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
      // Здесь проксируем '/payment' на https://koreacenter.kg/api
      '/payments': {
        target: 'https://koreacenter.kg/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/payments/, '/payments'),
      },
      '/mbank': {
        target: 'https://ibank2.cbk.kg',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mbank/, ''),
      },
    },
  },
});

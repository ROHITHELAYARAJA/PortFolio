import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-endpoints-plugin',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (!req.url) return next();
          const cleanUrl = req.url.split('?')[0];
          if (cleanUrl === '/api' || cleanUrl === '/api/') {
            req.url = '/api/index.json';
          } else if (cleanUrl === '/api/home') {
            req.url = '/api/home.json';
          } else if (cleanUrl === '/api/all') {
            req.url = '/api/all.json';
          } else if (cleanUrl === '/api/profile') {
            req.url = '/api/profile.json';
          } else if (cleanUrl === '/api/portfolio') {
            req.url = '/api/portfolio.json';
          }
          next();
        });
      },
      configurePreview(server) {
        server.middlewares.use((req, _res, next) => {
          if (!req.url) return next();
          const cleanUrl = req.url.split('?')[0];
          if (cleanUrl === '/api' || cleanUrl === '/api/') {
            req.url = '/api/index.json';
          } else if (cleanUrl === '/api/home') {
            req.url = '/api/home.json';
          } else if (cleanUrl === '/api/all') {
            req.url = '/api/all.json';
          } else if (cleanUrl === '/api/profile') {
            req.url = '/api/profile.json';
          } else if (cleanUrl === '/api/portfolio') {
            req.url = '/api/portfolio.json';
          }
          next();
        });
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: false,
  },
});

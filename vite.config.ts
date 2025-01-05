/* eslint-disable prettier/prettier */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'https://getimage-io.onrender.com', // Your backend URL
        changeOrigin: true,
        secure: false, // Allow self-signed certificates
      },
    },
  },
});
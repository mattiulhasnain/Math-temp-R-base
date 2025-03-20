import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Math-temp-R-base/', // Set the base URL to match your GitHub repository name
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
}); 
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "./", // Ensures assets use relative paths
  plugins: [react()],
  build: {
    outDir: "dist", // Ensure Netlify serves from dist
    assetsDir: "assets", // Keep assets organized
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

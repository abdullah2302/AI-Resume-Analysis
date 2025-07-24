import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),          // Enables React fast refresh
    tsconfigPaths(), 
    tailwindcss() // Support for tsconfig path resolution
  ],
  server: {
    port: 5173,        // Default Vite port (you can change if needed)
    strictPort: true,
    hmr: {
      overlay: false   // 🔧 Disable full-screen error overlay (fixes WS error spam)
    }
  },
  base: '/AI-Resume-Analysis', // Base public path when served in production
});

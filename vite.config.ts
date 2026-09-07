import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

/**
 * ============================================================================
 * KEVYLAB — CONFIGURATION VITE DU CLIENT FRONTEND
 * ============================================================================
 * Configure le serveur de développement rapide, le plugin React et l'alias
 * d'importation "@" pointant vers le répertoire "./src".
 * ============================================================================
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 5173,
    host: true
  },
  preview: {
    port: 4173
  }
});

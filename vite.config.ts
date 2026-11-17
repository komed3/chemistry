import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';


export default defineConfig( () => ( {
  base: '/chemistry/',
  plugins: [ react(), tailwindcss() ],
  resolve: { alias: { '@': resolve( import.meta.dirname, '.' ) } },
  build: {
    chunkSizeWarningLimit: 2000,
    outDir: 'dist',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks ( id ) {
          if ( id.includes( 'node_modules' ) ) {
            if ( id.includes( 'chem' ) ) return 'chemistry';
            if ( id.includes( 'lucide' ) ) return 'icons';
            if ( id.includes( 'react' ) ) return 'react';
            return 'vendor';
          }
        }
      }
    }
  }
} ) );

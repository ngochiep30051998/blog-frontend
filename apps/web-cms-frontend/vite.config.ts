/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import { resolve } from 'path';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/web-cms-frontend',
  
  resolve: {
    alias: {
      '@cms': resolve(__dirname, './src'),
    },
  },
  
  server: {
    port: 3000,
    host: 'localhost',
    watch: {
      // Watch for changes in lib source files
      ignored: ['!../../libs/**/src/**'],
      usePolling: false,
    }
  },
  
  preview: {
    port: 3000,
    host: 'localhost',
  },
  
  plugins: [
    react(),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
  ],
  
  // Worker configuration
  worker: {
    plugins: () => [nxViteTsPaths()],
  },
  
  build: {
    outDir: '../../dist/apps/web-cms-frontend',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  
  // Test configuration
  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/web-cms-frontend',
      provider: 'v8',
    },
  },
});

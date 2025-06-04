// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: 'public', // Serve from public folder
    base: process.env.NODE_ENV === 'production' ? 'https://cdnwf.bear.plus/compsych/' : 'http://localhost:5173/',
    server: {
        port: 5173, // Local development port
        cors: {
            origin: 'https://compsych.webflow.io', // Allow Webflow origin
            // Or use '*' to allow all origins (less secure)
        },
    },
    build: {
        outDir: '../dist', // Output directory
        emptyOutDir: true, // Clear dist/ before building
        rollupOptions: {
          // Define input JS files explicitly
          input: {
            'barba-init': resolve(__dirname, 'public/js/barba-init.js'),
            'common': resolve(__dirname, 'public/js/common.js'),
            'home': resolve(__dirname, 'public/js/home.js'),
            'about': resolve(__dirname, 'public/js/about.js'),
          },
          output: {
            // Output JS files to dist/js/ with preserved names
            entryFileNames: 'js/[name].js',
            chunkFileNames: 'js/[name].js',
            assetFileNames: 'js/[name].[ext]',
          },
        },
        minify: 'esbuild', // Minify JS for production
        target: 'esnext', // Modern JS output
      },
});
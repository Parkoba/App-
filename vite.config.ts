// import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import svgLoader from 'vite-svg-loader'
import { defineConfig } from 'vite'
import AutoPrefixer from 'autoprefixer';
import tailwindCSS from 'tailwindcss';
import tailwindConfig from './tailwind.config.js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader({
      svgo: false,
    }),
    // legacy()
  ],
  css: {
     postcss: {
      plugins: [
          AutoPrefixer({
            remove: true,
            grid: false,
            flexbox: false
          }),
          tailwindCSS(tailwindConfig),
      ]
     }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5000,
    strictPort: true,
  }
})
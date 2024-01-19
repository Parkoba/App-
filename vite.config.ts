// import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import svgLoader from 'vite-svg-loader'
import { defineConfig } from 'vite'
import AutoPrefixer from 'autoprefixer';
import tailwindCSS from 'tailwindcss';
// @ts-ignore
import tailwindConfig from './tailwind.config.ts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions:{
          comments: false,
          cacheHandlers: true,
          prefixIdentifiers: true,
        }
      }
    }),
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
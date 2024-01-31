// import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import svgLoader from 'vite-svg-loader'
import { defineConfig } from 'vite'
import AutoPrefixer from 'autoprefixer';
import tailwindCSS from 'tailwindcss';
import { VitePWA } from 'vite-plugin-pwa';
// @ts-ignore
import tailwindConfig from './tailwind.config.ts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions:{
          comments: false,
          prefixIdentifiers: true,
        }
      }
    }),
    VitePWA({
      manifest:{
        name: 'Parkoba - Passion For Parking',
        short_name: 'Parkoba',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/images/Parkoba Logo-144x144.jpg',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: '/images/Parkoba Logo-192x192.jpg',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/images/Parkoba Logo-512x512.jpg',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        display: 'minimal-ui',
      },
      registerType: 'autoUpdate',
    }),
    svgLoader({
      svgo: false,
    }),
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
      '~': path.resolve(__dirname, './assets'),
    },
  },
  server: {
    port: 5000,
    strictPort: true,
  },
  build:{
    minify: 'terser',
    cssMinify: 'lightningcss'
  }
})
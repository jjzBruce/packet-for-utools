import { defineConfig } from 'vite'
import Unocss from 'unocss/vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Modules from 'vite-plugin-use-modules'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { resolve } from 'path'

const outDir = resolve(__dirname, 'dist')

console.log('outDir: ', outDir)

export default defineConfig({
  base: './',
  server: {
    port: 3000,
  },
  plugins: [
    Vue(),
    Pages(),
    Unocss(),
    Components({
      dts: true,
    }),
    Modules({
      auto: true,
    }),
    AutoImport({
      dts: true,
      imports: ['vue', 'vue-router'],
    }),
  ],
  build: {
    outDir: outDir,
  }
})
